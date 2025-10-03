'use client'
import { useState, useEffect } from 'react'
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft } from 'react-icons/fa'

export default function ManageTeams() {
  const [teams, setTeams] = useState<any[]>([])
  const [selectedTeam, setSelectedTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => {
        setTeams(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const disqualifyTeam = async (teamId: string) => {
    if (confirm('Are you sure you want to disqualify this team?')) {
      try {
        const response = await fetch(`/api/teams/${teamId}`, { method: 'DELETE' })
        if (response.ok) {
          setTeams(teams.filter(team => team.id !== teamId))
        }
      } catch (error) {
        alert('Failed to disqualify team')
      }
    }
  }

  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/admin" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="Manage Teams">
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', padding: '24px', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{teams.length}</div>
              <div style={{ fontSize: '14px', opacity: '0.9' }}>Total Teams</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', padding: '24px', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{teams.filter(t => t.status === 'active').length || teams.length}</div>
              <div style={{ fontSize: '14px', opacity: '0.9' }}>Active Teams</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', padding: '24px', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{teams.filter(t => t.status === 'disqualified').length || 0}</div>
              <div style={{ fontSize: '14px', opacity: '0.9' }}>Disqualified</div>
            </div>
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '32px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
              <div style={{ fontSize: '18px' }}>Loading teams...</div>
            </div>
          ) : teams.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: '0.3' }}>⚽</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>No Teams Yet</h3>
              <p style={{ color: '#64748b', fontSize: '16px' }}>Teams will appear here once coaches register</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
              {teams.map((team, index) => {
                const gradients = [
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
                ];
                const gradient = gradients[index % gradients.length];
                
                return (
                  <div 
                    key={team.id} 
                    style={{ 
                      background: 'white', 
                      borderRadius: '20px', 
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)', 
                      border: '1px solid #f1f5f9',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ background: gradient, padding: '24px', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '80px', opacity: '0.1' }}>⚽</div>
                      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                        {team.teamLogo ? (
                          <img 
                            src={team.teamLogo} 
                            alt="Team Logo" 
                            style={{ 
                              width: '60px', 
                              height: '60px', 
                              objectFit: 'cover', 
                              borderRadius: '12px', 
                              marginRight: '16px',
                              border: '3px solid rgba(255,255,255,0.3)'
                            }} 
                          />
                        ) : (
                          <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            background: 'rgba(255,255,255,0.3)', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '16px', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            fontSize: '24px'
                          }}>
                            {team.teamName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, marginBottom: '4px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                            {team.teamName}
                          </h3>
                          <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                            Coach: {team.teamCoach}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>0</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>Matches</div>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb' }}>0</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>Points</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => setSelectedTeam(team)}
                          style={{ 
                            background: gradient, 
                            color: 'white', 
                            border: 'none', 
                            padding: '10px 16px', 
                            borderRadius: '8px', 
                            cursor: 'pointer', 
                            fontWeight: '600',
                            fontSize: '14px',
                            flex: 1
                          }}
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => disqualifyTeam(team.id)}
                          style={{ 
                            background: '#dc2626', 
                            color: 'white', 
                            border: 'none', 
                            padding: '10px 16px', 
                            borderRadius: '8px', 
                            cursor: 'pointer', 
                            fontWeight: '600',
                            fontSize: '14px',
                            flex: 1
                          }}
                        >
                          Disqualify
                        </button>
                      </div>
                      
                      <div style={{ marginTop: '16px', padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                        <p style={{ color: '#166534', fontSize: '12px', margin: 0 }}>
                          <strong>Registered:</strong> {new Date(team.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        
        {selectedTeam && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setSelectedTeam(null)}
          >
            <div 
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedTeam(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
              
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px' }}>
                  {selectedTeam.teamName}
                </h2>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Admin Team Management</p>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', marginBottom: '4px' }}>0</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Matches</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', marginBottom: '4px' }}>0</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Wins</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>0</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Goals</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '4px' }}>0</div>
                  <div style={{ color: '#6b7280', fontSize: '12px' }}>Points</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    disqualifyTeam(selectedTeam.id)
                    setSelectedTeam(null)
                  }}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    flex: 1
                  }}
                >
                  Disqualify Team
                </button>
                <button
                  onClick={() => setSelectedTeam(null)}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    flex: 1
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Section>
      <div style={{ paddingBottom: '60px' }}></div>
    </Main>
  )
}