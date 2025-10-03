'use client'
import { useState, useEffect } from 'react'
import Main from '../../components/Main'
import { FaUsers, FaClipboardList, FaChartLine, FaCalendarAlt, FaTrophy } from 'react-icons/fa'

export default function CoachDashboard() {
  const [completionPercentage, setCompletionPercentage] = useState(0)

  useEffect(() => {
    const checkCompletion = async () => {
      try {
        const response = await fetch('/api/team')
        if (response.ok) {
          const data = await response.json()
          if (data.team) {
            let completed = 0
            const total = 4
            if (data.team.teamName) completed++
            if (data.team.teamCoach) completed++
            if (data.team.teamLogo) completed++
            if (data.team.coachImage) completed++
            
            setCompletionPercentage(Math.round((completed / total) * 100))
          }
        }
      } catch (error) {
        setCompletionPercentage(0)
      }
    }
    checkCompletion()
  }, [])

  return (
    <Main>
      <div style={{ padding: '40px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>
            Coach Dashboard
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #059669, #047857)', 
              padding: '32px', 
              borderRadius: '16px', 
              boxShadow: '0 12px 40px rgba(5, 150, 105, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1', fontSize: '80px' }}>⚽</div>
              <FaUsers style={{ fontSize: '40px', color: 'white', marginBottom: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>My Team</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '16px', fontWeight: '500' }}>Manage players and roster</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>0/20</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Players</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>0</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Matches</div>
                </div>
              </div>
              <a href="/dashboard/coach/team" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                border: '2px solid rgba(255,255,255,0.3)', 
                padding: '12px 24px', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                textDecoration: 'none', 
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '14px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}>
                Manage Team
              </a>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', 
              padding: '32px', 
              borderRadius: '16px', 
              boxShadow: '0 12px 40px rgba(37, 99, 235, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1', fontSize: '80px' }}>📅</div>
              <FaCalendarAlt style={{ fontSize: '40px', color: 'white', marginBottom: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Team Fixture</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '16px', fontWeight: '500' }}>View team match schedule</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>0</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Upcoming</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>0</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Completed</div>
                </div>
              </div>
              <a href="/dashboard/coach/fixture" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                border: '2px solid rgba(255,255,255,0.3)', 
                padding: '12px 24px', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                textDecoration: 'none', 
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '14px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}>
                View Fixtures
              </a>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #ca8a04, #a16207)', 
              padding: '32px', 
              borderRadius: '16px', 
              boxShadow: '0 12px 40px rgba(202, 138, 4, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1', fontSize: '80px' }}>📄</div>
              <FaClipboardList style={{ fontSize: '40px', color: 'white', marginBottom: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Match Reports</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '16px', fontWeight: '500' }}>Submit and view match reports</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>0</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Pending</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>0</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Submitted</div>
                </div>
              </div>
              <a href="/dashboard/coach/reports" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                border: '2px solid rgba(255,255,255,0.3)', 
                padding: '12px 24px', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                textDecoration: 'none', 
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '14px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}>
                View Reports
              </a>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)', 
              padding: '32px', 
              borderRadius: '16px', 
              boxShadow: '0 12px 40px rgba(220, 38, 38, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1', fontSize: '80px' }}>📈</div>
              <FaChartLine style={{ fontSize: '40px', color: 'white', marginBottom: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Team Stats</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '16px', fontWeight: '500' }}>View team performance</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>0</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Goals</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>0%</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Win Rate</div>
                </div>
              </div>
              <a href="/dashboard/coach/stats" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                border: '2px solid rgba(255,255,255,0.3)', 
                padding: '12px 24px', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                textDecoration: 'none', 
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '14px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}>
                View Stats
              </a>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', 
              padding: '32px', 
              borderRadius: '16px', 
              boxShadow: '0 12px 40px rgba(124, 58, 237, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1', fontSize: '80px' }}>📝</div>
              <div style={{ fontSize: '40px', marginBottom: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>ℹ️</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Team Detail</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '16px', fontWeight: '500' }}>View and edit team information</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{completionPercentage === 100 ? '✓' : '○'}</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>{completionPercentage === 100 ? 'Complete' : 'Incomplete'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{completionPercentage}%</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Profile</div>
                </div>
              </div>
              <a href="/dashboard/coach/detail" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                border: '2px solid rgba(255,255,255,0.3)', 
                padding: '12px 24px', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                textDecoration: 'none', 
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '14px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}>
                View Detail
              </a>
            </div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #f59e0b, #d97706)', 
              padding: '32px', 
              borderRadius: '16px', 
              boxShadow: '0 12px 40px rgba(245, 158, 11, 0.2)', 
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: '0.1', fontSize: '80px' }}>🏆</div>
              <FaTrophy style={{ fontSize: '40px', color: 'white', marginBottom: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>League Standings</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '16px', fontWeight: '500' }}>View league table and rankings</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>-</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Position</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>0</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Points</div>
                </div>
              </div>
              <a href="/dashboard/coach/standings" style={{ 
                background: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                border: '2px solid rgba(255,255,255,0.3)', 
                padding: '12px 24px', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                textDecoration: 'none', 
                display: 'inline-block',
                fontWeight: '600',
                fontSize: '14px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}>
                View Standings
              </a>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Upcoming Matches</h2>
              <p style={{ color: '#6b7280' }}>No upcoming matches scheduled.</p>
            </div>
            
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Team News</h2>
              <p style={{ color: '#6b7280' }}>No recent team updates.</p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}