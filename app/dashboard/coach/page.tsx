'use client'
import { useState, useEffect } from 'react'
import Main from '../../components/Main'
import { FaUsers, FaClipboardList, FaChartLine, FaCalendarAlt, FaTrophy } from 'react-icons/fa'

export default function CoachDashboard() {
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [playersCount, setPlayersCount] = useState(0)
  const [matchReports, setMatchReports] = useState({ pending: 0, submitted: 0 })
  const [teamStats, setTeamStats] = useState({ goals: 0, winRate: 0 })
  const [teamMatches, setTeamMatches] = useState({ upcoming: 0, completed: 0 })
  const [teamName, setTeamName] = useState('')
  const [teamStanding, setTeamStanding] = useState({ position: '-', points: 0 })

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
            setTeamName(data.team.teamName || '')
            
            // Fetch team standings
            if (data.team.teamName) {
              fetch('/api/standings')
                .then(res => res.json())
                .then(standings => {
                  const teamData = standings.find(s => s.team === data.team.teamName)
                  if (teamData) {
                    setTeamStanding({ position: teamData.position, points: teamData.points })
                  }
                })
                .catch(() => {})
            }
            
            // Fetch team fixtures
            if (data.team.teamName) {
              const fixturesResponse = await fetch('/api/fixtures')
              if (fixturesResponse.ok) {
                const fixturesData = await fixturesResponse.json()
                if (fixturesData.success) {
                  const teamFixtures = fixturesData.fixtures.filter(f => 
                    f.homeTeam === data.team.teamName || f.awayTeam === data.team.teamName
                  )
                  setTeamMatches({
                    upcoming: teamFixtures.filter(f => f.status === 'scheduled').length,
                    completed: teamFixtures.filter(f => f.status === 'completed').length
                  })
                }
              }
            }
          }
        }
      } catch (error) {
        setCompletionPercentage(0)
      }
    }
    checkCompletion()
    
    // Fetch players count
    fetch('/api/players')
      .then(res => res.json())
      .then(data => {
        if (data.players) {
          setPlayersCount(data.players.length)
        }
      })
      .catch(() => {})
    
    // Fetch team data first, then fixtures
    fetch('/api/team')
      .then(res => res.json())
      .then(teamData => {
        if (teamData.team?.teamName) {
          const teamName = teamData.team.teamName
          
          fetch('/api/fixtures')
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                const teamCompleted = data.fixtures.filter(f => 
                  f.status === 'completed' && 
                  (f.homeTeam === teamName || f.awayTeam === teamName)
                )
                
                // Fetch submitted reports
                fetch('/api/match-reports')
                  .then(res => res.json())
                  .then(reportsData => {
                    const submitted = reportsData.success ? reportsData.reports.length : 0
                    const pending = teamCompleted.length - submitted
                    setMatchReports({ pending: Math.max(0, pending), submitted })
                  })
                  .catch(() => {
                    setMatchReports({ pending: teamCompleted.length, submitted: 0 })
                  })
          
                const totalGoals = teamCompleted.reduce((sum, f) => sum + (f.homeScore || 0) + (f.awayScore || 0), 0)
                const wins = teamCompleted.filter(f => f.homeScore > f.awayScore || f.awayScore > f.homeScore).length
                const winRate = teamCompleted.length > 0 ? Math.round((wins / teamCompleted.length) * 100) : 0
                
                setTeamStats({ goals: totalGoals, winRate })
              }
            })
        }
      })
      .catch(() => {})
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
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{playersCount}/20</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Players</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{teamMatches.upcoming + teamMatches.completed}</div>
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
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{teamMatches.upcoming}</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Upcoming</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{teamMatches.completed}</div>
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
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{matchReports.pending}</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Pending</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{matchReports.submitted}</div>
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
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{teamStats.goals}</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Goals</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{teamStats.winRate}%</div>
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
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{teamStanding.position}</div>
                  <div style={{ fontSize: '14px', opacity: '0.8' }}>Position</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>{teamStanding.points}</div>
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
          

        </div>
      </div>
    </Main>
  )
}