"use client";
import { useState, useEffect } from 'react';
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft } from 'react-icons/fa'

export default function UpdateResults() {
  const [fixtures, setFixtures] = useState([]);
  const [completedFixtures, setCompletedFixtures] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null);
  const [scores, setScores] = useState({});

  useEffect(() => {
    fetch('/api/fixtures')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFixtures(data.fixtures.filter(f => f.status === 'scheduled'))
          setCompletedFixtures(data.fixtures.filter(f => f.status === 'completed'))
        }
      })
      .catch(() => {});
  }, []);

  const rounds = [...new Set(fixtures.map(f => f.round))].sort((a, b) => a - b);
  const completedRounds = [...new Set(completedFixtures.map(f => f.round))].sort((a, b) => a - b);
  const roundFixtures = selectedRound ? fixtures.filter(f => f.round === selectedRound) : [];
  const [selectedCompletedRound, setSelectedCompletedRound] = useState(null);

  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/admin" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="Update Results">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#059669' }}>Completed Matches</h3>
            {completedFixtures.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '40px' }}>No completed matches yet</p>
            ) : !selectedCompletedRound ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                {completedRounds.map(round => (
                  <div
                    key={round}
                    onClick={() => setSelectedCompletedRound(round)}
                    style={{
                      background: 'linear-gradient(135deg, #059669, #047857)',
                      color: 'white',
                      padding: '20px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '6px' }}>Round {round}</h4>
                    <p style={{ fontSize: '14px', margin: 0 }}>{completedFixtures.filter(f => f.round === round).length} completed</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedCompletedRound(null)}
                  style={{ background: '#6b7280', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', marginBottom: '16px', cursor: 'pointer', fontSize: '14px' }}
                >
                  ← Back to Rounds
                </button>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Round {selectedCompletedRound} Results</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {completedFixtures.filter(f => f.round === selectedCompletedRound).map((fixture) => (
                    <div key={fixture.id} style={{ padding: '16px', border: '2px solid #059669', borderRadius: '8px', background: '#f0fdf4' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontWeight: '600', fontSize: '16px' }}>{fixture.homeTeam} vs {fixture.awayTeam}</span>
                          {fixture.matchDate && (
                            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                              {new Date(fixture.matchDate).toLocaleDateString()} {fixture.matchTime && `at ${fixture.matchTime}`}
                            </div>
                          )}
                        </div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>
                          {fixture.homeScore} - {fixture.awayScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#2563eb' }}>Scheduled Matches</h3>
        {!selectedRound ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {rounds.map(round => (
              <div
                key={round}
                onClick={() => setSelectedRound(round)}
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Round {round}</h3>
                <p>{fixtures.filter(f => f.round === round).length} matches</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedRound(null)}
              style={{ background: '#6b7280', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', marginBottom: '20px', cursor: 'pointer' }}
            >
              ← Back to Rounds
            </button>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Round {selectedRound} Matches</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {roundFixtures.map((fixture, index) => (
                <div key={index} style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                      {fixture.homeTeam} vs {fixture.awayTeam}
                    </div>
                    {fixture.matchDate && (
                      <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '12px' }}>
                        {new Date(fixture.matchDate).toLocaleDateString()} {fixture.matchTime && `at ${fixture.matchTime}`}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={scores[`${fixture.id}_home`] || ''}
                        onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_home`]: e.target.value}))}
                        style={{ width: '50px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', textAlign: 'center' }} 
                      />
                      <span>-</span>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={scores[`${fixture.id}_away`] || ''}
                        onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_away`]: e.target.value}))}
                        style={{ width: '50px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', textAlign: 'center' }} 
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                      <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{fixture.homeTeam}</h4>
                        {Array.from({ length: parseInt(scores[`${fixture.id}_home`]) || 0 }, (_, i) => (
                          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                            <input 
                              type="text" 
                              placeholder="Scorer" 
                              value={scores[`${fixture.id}_home_scorer_${i}`] || ''}
                              onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_home_scorer_${i}`]: e.target.value}))}
                              style={{ flex: 1, padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} 
                            />
                            <input 
                              type="text" 
                              placeholder="Time" 
                              value={scores[`${fixture.id}_home_time_${i}`] || ''}
                              onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_home_time_${i}`]: e.target.value}))}
                              style={{ width: '50px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} 
                            />
                            <input 
                              type="text" 
                              placeholder="Assist" 
                              value={scores[`${fixture.id}_home_assist_${i}`] || ''}
                              onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_home_assist_${i}`]: e.target.value}))}
                              style={{ flex: 1, padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} 
                            />
                          </div>
                        ))}
                        {(parseInt(scores[`${fixture.id}_away`]) || 0) === 0 && (
                          <div>
                            <label style={{ fontSize: '12px', color: '#6b7280' }}>Clean Sheet: </label>
                            <input 
                              type="text" 
                              placeholder="Goalkeeper" 
                              value={scores[`${fixture.id}_home_cleansheet`] || ''}
                              onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_home_cleansheet`]: e.target.value}))}
                              style={{ width: '120px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} 
                            />
                          </div>
                        )}
                      </div>
                      <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{fixture.awayTeam}</h4>
                        {Array.from({ length: parseInt(scores[`${fixture.id}_away`]) || 0 }, (_, i) => (
                          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                            <input 
                              type="text" 
                              placeholder="Scorer" 
                              value={scores[`${fixture.id}_away_scorer_${i}`] || ''}
                              onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_away_scorer_${i}`]: e.target.value}))}
                              style={{ flex: 1, padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} 
                            />
                            <input 
                              type="text" 
                              placeholder="Time" 
                              value={scores[`${fixture.id}_away_time_${i}`] || ''}
                              onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_away_time_${i}`]: e.target.value}))}
                              style={{ width: '50px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} 
                            />
                            <input 
                              type="text" 
                              placeholder="Assist" 
                              value={scores[`${fixture.id}_away_assist_${i}`] || ''}
                              onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_away_assist_${i}`]: e.target.value}))}
                              style={{ flex: 1, padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} 
                            />
                          </div>
                        ))}
                        {(parseInt(scores[`${fixture.id}_home`]) || 0) === 0 && (
                          <div>
                            <label style={{ fontSize: '12px', color: '#6b7280' }}>Clean Sheet: </label>
                            <input 
                              type="text" 
                              placeholder="Goalkeeper" 
                              value={scores[`${fixture.id}_away_cleansheet`] || ''}
                              onChange={(e) => setScores(prev => ({...prev, [`${fixture.id}_away_cleansheet`]: e.target.value}))}
                              style={{ width: '120px', padding: '4px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px' }} 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={async () => {
                        const homeScore = scores[`${fixture.id}_home`] || 0;
                        const awayScore = scores[`${fixture.id}_away`] || 0;
                        const goalscorers = scores[`${fixture.id}_goalscorers`] || '';
                        const assists = scores[`${fixture.id}_assists`] || '';
                        const cleansheet = scores[`${fixture.id}_cleansheet`] || '';
                        try {
                          // Collect all form data for this fixture
                          const formData = { fixtureId: fixture.id, homeScore, awayScore }
                          
                          // Add all scorer, assist, time, and cleansheet data
                          Object.keys(scores).forEach(key => {
                            if (key.startsWith(`${fixture.id}_`) && scores[key]) {
                              formData[key.replace(`${fixture.id}_`, '')] = scores[key]
                            }
                          })
                          
                          const response = await fetch('/api/fixtures/update-result', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData)
                          });
                          if (response.ok) {
                            const updatedFixture = { ...fixture, homeScore: parseInt(homeScore), awayScore: parseInt(awayScore), status: 'completed' }
                            setCompletedFixtures(prev => [...prev, updatedFixture])
                            setFixtures(prev => prev.filter(f => f.id !== fixture.id))
                            alert('Result updated successfully!')
                          } else {
                            alert('Failed to update result')
                          }
                        } catch (error) {
                          alert('Error updating result');
                        }
                      }}
                      style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      Update Result
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        </div>
      </Section>
    </Main>
  )
}