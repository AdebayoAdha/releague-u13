'use client'
import { useState, useEffect } from 'react'
import Main from '../components/Main'
import Section from '../components/Section'

export default function Clubs() {
  const [teams, setTeams] = useState<any[]>([])
  const [selectedTeam, setSelectedTeam] = useState<any>(null)

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
  }, [])

  return (
    <Main>
      <Section title="Clubs">
        {teams.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)', borderRadius: '20px', border: '2px dashed #cbd5e1' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', opacity: '0.5' }}>⚽</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>No Clubs Yet</h3>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Clubs will appear here once teams are registered</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
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
                  onClick={() => setSelectedTeam(team)}
                  style={{ 
                    background: 'white', 
                    borderRadius: '24px', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
                    border: '1px solid #f1f5f9',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ background: gradient, padding: '32px 24px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '120px', opacity: '0.1' }}>⚽</div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                      {team.teamLogo ? (
                        <img 
                          src={team.teamLogo} 
                          alt="Team Logo" 
                          style={{ 
                            width: '80px', 
                            height: '80px', 
                            objectFit: 'cover', 
                            borderRadius: '20px', 
                            marginRight: '20px', 
                            border: '4px solid rgba(255,255,255,0.3)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                          }} 
                        />
                      ) : (
                        <div style={{ 
                          width: '80px', 
                          height: '80px', 
                          background: 'rgba(255,255,255,0.3)', 
                          borderRadius: '20px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          marginRight: '20px', 
                          color: 'white', 
                          fontWeight: 'bold', 
                          fontSize: '32px',
                          border: '4px solid rgba(255,255,255,0.2)',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                        }}>
                          {team.teamName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 style={{ 
                          fontSize: '28px', 
                          fontWeight: 'bold', 
                          margin: 0, 
                          marginBottom: '8px', 
                          color: 'white',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}>
                          {team.teamName}
                        </h3>
                        <p style={{ 
                          color: 'rgba(255,255,255,0.9)', 
                          margin: 0, 
                          fontSize: '16px',
                          fontWeight: '500'
                        }}>
                          U13 Football Club
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ padding: '24px' }}>
                    <div style={{ 
                      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)', 
                      padding: '20px', 
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        {team.coachImage ? (
                          <img 
                            src={team.coachImage} 
                            alt="Coach" 
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              objectFit: 'cover', 
                              borderRadius: '50%', 
                              marginRight: '12px',
                              border: '2px solid #e2e8f0'
                            }} 
                          />
                        ) : (
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            background: gradient, 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '12px', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            fontSize: '16px'
                          }}>
                            {team.teamCoach.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p style={{ 
                            color: '#1e293b', 
                            margin: 0, 
                            fontWeight: '600',
                            fontSize: '16px'
                          }}>
                            Coach {team.teamCoach}
                          </p>
                          <p style={{ 
                            color: '#64748b', 
                            fontSize: '14px', 
                            margin: 0,
                            marginTop: '2px'
                          }}>
                            Registered {new Date(team.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Section>
      
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
              {selectedTeam.teamLogo ? (
                <img 
                  src={selectedTeam.teamLogo} 
                  alt="Team Logo" 
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    objectFit: 'cover', 
                    borderRadius: '20px', 
                    marginBottom: '16px',
                    border: '4px solid #e5e7eb'
                  }} 
                />
              ) : (
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  background: 'linear-gradient(135deg, #059669, #047857)', 
                  borderRadius: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 16px', 
                  color: 'white', 
                  fontWeight: 'bold', 
                  fontSize: '40px'
                }}>
                  {selectedTeam.teamName.charAt(0)}
                </div>
              )}
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#065f46', marginBottom: '8px' }}>
                {selectedTeam.teamName}
              </h2>
              <p style={{ color: '#6b7280', fontSize: '18px' }}>Coach: {selectedTeam.teamCoach}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>0</div>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>Matches Played</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2563eb', marginBottom: '8px' }}>0</div>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>Wins</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#6b7280', marginBottom: '8px' }}>0</div>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>Draws</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px' }}>0</div>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>Losses</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>0</div>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>Goals Scored</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>0</div>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>Goals Conceded</div>
              </div>
            </div>
            
            <div style={{ marginTop: '24px', padding: '20px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <p style={{ color: '#166534', fontSize: '14px', margin: 0 }}>
                <strong>Registered:</strong> {new Date(selectedTeam.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ paddingBottom: '60px' }}></div>
    </Main>
  )
}