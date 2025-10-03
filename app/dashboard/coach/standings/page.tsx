'use client'
import { useState, useEffect } from 'react'
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft, FaTrophy } from 'react-icons/fa'

interface Standing {
  position: number
  team: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  gd: number
  points: number
}

export default function LeagueStandings() {
  const [standings, setStandings] = useState<Standing[]>([])
  const [userTeam, setUserTeam] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [standingsRes, teamRes] = await Promise.all([
          fetch('/api/standings'),
          fetch('/api/team')
        ])
        
        const standingsData = await standingsRes.json()
        const teamData = await teamRes.json()
        
        setStandings(standingsData)
        setUserTeam(teamData.teamName || '')
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Main>
        <div style={{ padding: '20px 16px 0' }}>
          <a href="/dashboard/coach" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
            <FaArrowLeft style={{ marginRight: '8px' }} />
            Back to Dashboard
          </a>
        </div>
        <Section title="League Standings">
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <p>Loading standings...</p>
          </div>
        </Section>
      </Main>
    )
  }

  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/coach" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="League Standings">
        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <FaTrophy style={{ fontSize: '32px', color: '#f59e0b', marginRight: '16px' }} />
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', marginBottom: '4px' }}>U13 League Table</h3>
              <p style={{ color: '#6b7280', margin: '0', fontSize: '16px' }}>Season 2024/25</p>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: 'bold', color: '#1e293b' }}>Pos</th>
                  <th style={{ padding: '16px 12px', textAlign: 'left', fontWeight: 'bold', color: '#1e293b' }}>Team</th>
                  <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b' }}>P</th>
                  <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b' }}>W</th>
                  <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b' }}>D</th>
                  <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b' }}>L</th>
                  <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b' }}>GF</th>
                  <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b' }}>GA</th>
                  <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b' }}>GD</th>
                  <th style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b' }}>Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team) => (
                  <tr key={team.position} style={{ 
                    borderBottom: '1px solid #e2e8f0',
                    background: team.team === userTeam ? 'linear-gradient(135deg, #ecfdf5, #f0fdf4)' : 'white',
                    transition: 'all 0.3s ease'
                  }}>
                    <td style={{ padding: '16px 12px', fontWeight: 'bold', color: team.position <= 3 ? '#f59e0b' : '#64748b' }}>
                      {team.position <= 3 && <FaTrophy style={{ marginRight: '8px', color: team.position === 1 ? '#fbbf24' : team.position === 2 ? '#9ca3af' : '#cd7c2f' }} />}
                      {team.position}
                    </td>
                    <td style={{ padding: '16px 12px', fontWeight: team.team === userTeam ? 'bold' : '500', color: team.team === userTeam ? '#059669' : '#1e293b' }}>
                      {team.team}
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#64748b' }}>{team.played}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#059669', fontWeight: '600' }}>{team.won}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#6b7280' }}>{team.drawn}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#dc2626', fontWeight: '600' }}>{team.lost}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#64748b' }}>{team.gf}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: '#64748b' }}>{team.ga}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: team.gd >= 0 ? '#059669' : '#dc2626', fontWeight: '600' }}>
                      {team.gd >= 0 ? '+' : ''}{team.gd}
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: '24px', padding: '20px', background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#1e293b' }}>Legend</h4>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '14px', color: '#64748b' }}>
              <span><strong>P:</strong> Played</span>
              <span><strong>W:</strong> Won</span>
              <span><strong>D:</strong> Drawn</span>
              <span><strong>L:</strong> Lost</span>
              <span><strong>GF:</strong> Goals For</span>
              <span><strong>GA:</strong> Goals Against</span>
              <span><strong>GD:</strong> Goal Difference</span>
              <span><strong>Pts:</strong> Points</span>
            </div>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px', margin: '8px 0 0 0' }}>Teams sorted by points, head-to-head record, goal difference, then goals scored.</p>
          </div>
        </div>
      </Section>
    </Main>
  )
}