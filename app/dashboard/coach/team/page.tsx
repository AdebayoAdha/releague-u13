'use client'
import { useState, useEffect } from 'react'
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft, FaTrash, FaEdit } from 'react-icons/fa'

export default function MyTeam() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    position: '',
    number: '',
    image: null as File | null
  })
  const [players, setPlayers] = useState<any[]>([])
  const [editingPlayer, setEditingPlayer] = useState<any>(null)

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const response = await fetch('/api/players')
        if (response.ok) {
          const data = await response.json()
          setPlayers(data.players || [])
        }
      } catch (error) {
        console.error('Failed to load players:', error)
      }
    }
    loadPlayers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('dateOfBirth', formData.dateOfBirth)
      formDataToSend.append('position', formData.position)
      formDataToSend.append('number', formData.number)
      if (formData.image) formDataToSend.append('image', formData.image)
      
      const response = await fetch('/api/players', {
        method: 'POST',
        body: formDataToSend,
      })
      
      if (response.ok) {
        const data = await response.json()
        setPlayers([...players, data.player])
        setShowForm(false)
        setFormData({ name: '', dateOfBirth: '', position: '', number: '', image: null })
        alert('Player added successfully!')
      } else {
        alert('Failed to add player')
      }
    } catch (error) {
      alert('Error adding player')
    }
  }

  const removePlayer = async (playerId: string) => {
    try {
      const response = await fetch(`/api/players?id=${playerId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setPlayers(players.filter(player => player.id !== playerId))
      } else {
        alert('Failed to remove player')
      }
    } catch (error) {
      alert('Error removing player')
    }
  }

  const minDate = new Date()
  minDate.setFullYear(minDate.getFullYear() - 13)
  const minDateString = minDate.toISOString().split('T')[0]

  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/coach" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="My Team">
        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', marginBottom: '8px' }}>Team Roster</h3>
              <p style={{ color: '#6b7280', margin: '0', fontSize: '16px' }}>{players.length}/20 Players</p>
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              style={{ 
                background: showForm ? '#dc2626' : '#059669', 
                color: 'white', 
                border: 'none', 
                padding: '14px 28px', 
                borderRadius: '12px', 
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              {showForm ? 'Cancel' : '+ Add Player'}
            </button>
          </div>
          
          {showForm ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', marginBottom: '32px' }}>
              <div>
                {players.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {players.map((player) => (
                      <div key={player.id} style={{ 
                        padding: '20px', 
                        background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                        border: '2px solid #e2e8f0', 
                        borderRadius: '12px', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                        position: 'relative'
                      }}>
                        <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#059669', color: 'white', padding: '4px 8px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}>#{player.number}</div>
                        <button
                          onClick={() => removePlayer(player.id)}
                          style={{ position: 'absolute', top: '12px', left: '12px', background: '#dc2626', color: 'white', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <FaTrash size={12} />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {player.image ? (
                            <img
                              src={player.image}
                              alt={player.name}
                              style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '2px solid #e2e8f0'
                              }}
                            />
                          ) : (
                            <div style={{
                              width: '50px',
                              height: '50px',
                              background: '#f1f5f9',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '20px',
                              fontWeight: 'bold',
                              color: '#64748b'
                            }}>
                              {player.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px', color: '#1e293b' }}>{player.name}</h4>
                            <p style={{ fontSize: '13px', color: '#059669', fontWeight: '600', marginBottom: '4px' }}>{player.position}</p>
                            <p style={{ fontSize: '11px', color: '#64748b' }}>Age: {calculateAge(player.dateOfBirth)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px 20px', 
                    background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                    borderRadius: '12px',
                    border: '2px dashed #cbd5e1'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚽</div>
                    <p style={{ color: '#64748b', fontSize: '16px', fontWeight: '500' }}>No players added yet</p>
                  </div>
                )}
              </div>
              
              {editingPlayer && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }}>
                  <div style={{
                    background: 'white',
                    padding: '32px',
                    borderRadius: '16px',
                    width: '400px',
                    maxHeight: '80vh',
                    overflow: 'auto'
                  }}>
                    <h3 style={{ marginBottom: '24px', fontSize: '22px', fontWeight: 'bold' }}>Edit Player</h3>
                    <form onSubmit={async (e) => {
                      e.preventDefault()
                      try {
                        const formDataToSend = new FormData()
                        formDataToSend.append('id', editingPlayer.id)
                        formDataToSend.append('name', editingPlayer.name)
                        formDataToSend.append('dateOfBirth', editingPlayer.dateOfBirth)
                        formDataToSend.append('position', editingPlayer.position)
                        formDataToSend.append('number', editingPlayer.number.toString())
                        
                        const response = await fetch('/api/players', {
                          method: 'PUT',
                          body: formDataToSend,
                        })
                        
                        if (response.ok) {
                          setPlayers(players.map(p => p.id === editingPlayer.id ? editingPlayer : p))
                          setEditingPlayer(null)
                          alert('Player updated successfully!')
                        } else {
                          alert('Failed to update player')
                        }
                      } catch (error) {
                        alert('Error updating player')
                      }
                    }}>
                      <input
                        type="text"
                        value={editingPlayer.name}
                        onChange={(e) => setEditingPlayer({...editingPlayer, name: e.target.value})}
                        style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                      <input
                        type="date"
                        value={editingPlayer.dateOfBirth}
                        onChange={(e) => setEditingPlayer({...editingPlayer, dateOfBirth: e.target.value})}
                        style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                      <select
                        value={editingPlayer.position}
                        onChange={(e) => setEditingPlayer({...editingPlayer, position: e.target.value})}
                        style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                      >
                        <option value="Goalkeeper">Goalkeeper</option>
                        <option value="Defender">Defender</option>
                        <option value="Midfielder">Midfielder</option>
                        <option value="Forward">Forward</option>
                      </select>
                      <input
                        type="number"
                        value={editingPlayer.number}
                        onChange={(e) => setEditingPlayer({...editingPlayer, number: parseInt(e.target.value)})}
                        style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '2px solid #e2e8f0', borderRadius: '8px', boxSizing: 'border-box' }}
                      />
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="submit" style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>Save</button>
                        <button type="button" onClick={() => setEditingPlayer(null)} style={{ background: '#6b7280', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', flex: 1 }}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} style={{ 
                padding: '32px', 
                background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', 
                border: '2px solid #e2e8f0', 
                borderRadius: '16px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                height: 'fit-content'
              }}>
                <h3 style={{ marginBottom: '24px', fontSize: '22px', fontWeight: 'bold', color: '#1e293b' }}>Add New Player</h3>
                
                <input
                  type="text"
                  placeholder="Player Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '16px', marginBottom: '20px', border: '2px solid #e2e8f0', borderRadius: '12px', boxSizing: 'border-box', fontSize: '16px' }}
                />
                
                <input
                  type="date"
                  min={minDateString}
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  required
                  style={{ width: '100%', padding: '16px', marginBottom: '20px', border: '2px solid #e2e8f0', borderRadius: '12px', boxSizing: 'border-box', fontSize: '16px' }}
                />
                
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  required
                  style={{ width: '100%', padding: '16px', marginBottom: '20px', border: '2px solid #e2e8f0', borderRadius: '12px', boxSizing: 'border-box', fontSize: '16px' }}
                >
                  <option value="">Select Position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
                
                <input
                  type="number"
                  placeholder="Player Number"
                  min="1"
                  max="99"
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  required
                  style={{ width: '100%', padding: '16px', marginBottom: '20px', border: '2px solid #e2e8f0', borderRadius: '12px', boxSizing: 'border-box', fontSize: '16px' }}
                />
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                  style={{ width: '100%', padding: '16px', marginBottom: '24px', border: '2px solid #e2e8f0', borderRadius: '12px', boxSizing: 'border-box', fontSize: '16px' }}
                />
                
                <button
                  type="submit"
                  style={{ 
                    background: 'linear-gradient(135deg, #059669, #047857)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '16px 32px', 
                    borderRadius: '12px', 
                    cursor: 'pointer', 
                    fontSize: '16px',
                    fontWeight: '600',
                    boxShadow: '0 6px 20px rgba(5, 150, 105, 0.3)',
                    width: '100%'
                  }}
                >
                  Add Player
                </button>
              </form>
            </div>
          ) : (
            <div>
              {players.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                  {players.map((player) => (
                    <div key={player.id} style={{ 
                      padding: '0',
                      background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                      border: '2px solid #e2e8f0', 
                      borderRadius: '20px', 
                      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#059669', color: 'white', padding: '8px 16px', borderRadius: '25px', fontSize: '16px', fontWeight: 'bold', zIndex: 2, boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)' }}>#{player.number}</div>
                      <button
                        onClick={() => removePlayer(player.id)}
                        style={{ position: 'absolute', top: '20px', left: '20px', background: '#dc2626', color: 'white', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)', zIndex: 2 }}
                      >
                        <FaTrash size={16} />
                      </button>
                      <div style={{ padding: '32px', paddingTop: '60px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                          {player.image ? (
                            <img
                              src={player.image}
                              alt={player.name}
                              style={{
                                width: '90px',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '4px solid white',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                marginBottom: '20px'
                              }}
                            />
                          ) : (
                            <div style={{
                              width: '90px',
                              height: '90px',
                              background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '36px',
                              fontWeight: 'bold',
                              color: '#64748b',
                              border: '4px solid white',
                              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                              marginBottom: '20px'
                            }}>
                              {player.name.charAt(0)}
                            </div>
                          )}
                          <h4 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#1e293b' }}>{player.name}</h4>
                          <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>{player.position}</div>
                          <p style={{ fontSize: '16px', color: '#64748b', fontWeight: '500' }}>Age: {calculateAge(player.dateOfBirth)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px', 
                  background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                  borderRadius: '16px',
                  border: '2px dashed #cbd5e1'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚽</div>
                  <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '500' }}>No players added yet</p>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>Click "Add Player" to build your team roster</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Section>
    </Main>
  )
}