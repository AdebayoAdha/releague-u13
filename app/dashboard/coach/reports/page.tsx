"use client";
import { useState, useEffect } from 'react';
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft, FaPlus } from 'react-icons/fa'

export default function MatchReports() {
  const [fixtures, setFixtures] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [submittedReports, setSubmittedReports] = useState([]);

  useEffect(() => {
    const fetchTeamFixtures = async () => {
      try {
        const teamResponse = await fetch('/api/team');
        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          if (teamData.team?.teamName) {
            const fixturesResponse = await fetch('/api/fixtures');
            if (fixturesResponse.ok) {
              const fixturesData = await fixturesResponse.json();
              if (fixturesData.success) {
                const teamFixtures = fixturesData.fixtures.filter(f => 
                  (f.homeTeam === teamData.team.teamName || f.awayTeam === teamData.team.teamName) &&
                  f.status === 'completed'
                );
                setFixtures(teamFixtures);
              }
            }
            
            // Fetch players for squad list
            const playersResponse = await fetch('/api/players');
            if (playersResponse.ok) {
              const playersData = await playersResponse.json();
              if (playersData.players) {
                setPlayers(playersData.players);
              }
            }
            
            // Fetch submitted reports
            const reportsResponse = await fetch('/api/match-reports');
            if (reportsResponse.ok) {
              const reportsData = await reportsResponse.json();
              if (reportsData.success) {
                setSubmittedReports(reportsData.reports.map(r => r.fixtureId));
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch fixtures:', error);
      }
    };
    fetchTeamFixtures();
  }, []);

  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/coach" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="Match Reports">
        {!selectedMatch ? (
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Select Match to Report</h3>
            {fixtures.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {fixtures.map((fixture, index) => {
                  const isSubmitted = submittedReports.includes(fixture.id);
                  return (
                    <div 
                      key={index} 
                      onClick={isSubmitted ? undefined : () => setSelectedMatch(fixture)}
                      style={{ 
                        border: isSubmitted ? '1px solid #059669' : '1px solid #e5e7eb', 
                        borderRadius: '8px', 
                        padding: '16px', 
                        cursor: isSubmitted ? 'default' : 'pointer',
                        transition: 'border-color 0.2s',
                        background: isSubmitted ? '#f0fdf4' : 'white',
                        opacity: isSubmitted ? 0.7 : 1
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitted) e.currentTarget.style.borderColor = '#2563eb'
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitted) e.currentTarget.style.borderColor = '#e5e7eb'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '16px', fontWeight: '600' }}>
                          {fixture.homeTeam} vs {fixture.awayTeam}
                        </div>
                        <div style={{ fontSize: '14px', color: isSubmitted ? '#059669' : '#6b7280', fontWeight: isSubmitted ? '600' : 'normal' }}>
                          Round {fixture.round} • {isSubmitted ? 'Report Submitted ✓' : 'Click to create report'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: '#6b7280' }}>No completed matches available for reporting.</p>
            )}
          </div>
        ) : (
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <button 
              onClick={() => setSelectedMatch(null)}
              style={{ background: '#6b7280', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', marginBottom: '20px', cursor: 'pointer' }}
            >
              ← Back to Matches
            </button>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>
              Match Report: {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', fontSize: '16px' }}>Squad List</label>
                <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '16px', background: '#f9fafb' }}>
                  {players.length === 0 ? (
                    <p style={{ color: '#6b7280', textAlign: 'center', margin: 0 }}>No players available. Add players to your team first.</p>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                      {players.map((player, index) => (
                        <div 
                          key={index}
                          onClick={() => {
                            if (selectedPlayers.includes(player.name)) {
                              setSelectedPlayers(selectedPlayers.filter(p => p !== player.name))
                            } else {
                              setSelectedPlayers([...selectedPlayers, player.name])
                            }
                          }}
                          style={{ 
                            padding: '12px', 
                            border: selectedPlayers.includes(player.name) ? '2px solid #059669' : '1px solid #e5e7eb', 
                            borderRadius: '6px', 
                            cursor: 'pointer',
                            background: selectedPlayers.includes(player.name) ? '#f0fdf4' : 'white',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{player.name}</div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>{player.position}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ marginTop: '12px', fontSize: '14px', color: '#6b7280' }}>
                  Selected: {selectedPlayers.length} players
                </div>
              </div>
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/match-reports', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        fixtureId: selectedMatch.id,
                        selectedPlayers
                      })
                    })
                    
                    if (response.ok) {
                      alert(`Match report submitted with ${selectedPlayers.length} players selected!`)
                      setSubmittedReports([...submittedReports, selectedMatch.id])
                      setSelectedMatch(null)
                      setSelectedPlayers([])
                    } else {
                      alert('Failed to submit match report')
                    }
                  } catch (error) {
                    alert('Error submitting match report')
                  }
                }}
                style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
              >
                Submit Report
              </button>
            </div>
          </div>
        )}
      </Section>
    </Main>
  )
}