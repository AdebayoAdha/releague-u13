"use client";
import { useState, useEffect } from 'react';
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft } from 'react-icons/fa'

export default function TeamFixture() {
  const [fixtures, setFixtures] = useState([]);
  const [matchResults, setMatchResults] = useState([]);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchTeamFixtures = async () => {
      try {
        const teamResponse = await fetch('/api/team');
        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          if (teamData.team?.teamName) {
            setTeamName(teamData.team.teamName);
            
            const fixturesResponse = await fetch('/api/fixtures');
            if (fixturesResponse.ok) {
              const fixturesData = await fixturesResponse.json();
              if (fixturesData.success) {
                const teamFixtures = fixturesData.fixtures.filter(f => 
                  f.homeTeam === teamData.team.teamName || f.awayTeam === teamData.team.teamName
                );
                setFixtures(teamFixtures);
                
                // Fetch match results for completed fixtures
                const resultsResponse = await fetch('/api/match-results');
                if (resultsResponse.ok) {
                  const resultsData = await resultsResponse.json();
                  if (resultsData.success) {
                    setMatchResults(resultsData.results);
                  }
                }
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

  const upcomingMatches = fixtures.filter(f => f.status === 'scheduled').sort((a, b) => a.round - b.round);
  const completedMatches = fixtures.filter(f => f.status === 'completed').sort((a, b) => a.round - b.round);

  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/coach" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="Team Fixture">
        <div style={{ display: 'grid', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Upcoming Matches ({upcomingMatches.length})</h3>
            {upcomingMatches.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {upcomingMatches.map((fixture, index) => (
                  <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>
                        {fixture.homeTeam} vs {fixture.awayTeam}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        Round {fixture.round} • {fixture.venue}
                      </div>
                    </div>
                    {fixture.date && (
                      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                        {fixture.date} {fixture.time && `at ${fixture.time}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#6b7280' }}>No upcoming matches scheduled.</p>
            )}
          </div>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Completed Matches ({completedMatches.length})</h3>
            {completedMatches.length > 0 ? (
              <div style={{ display: 'grid', gap: '12px' }}>
                {completedMatches.map((fixture, index) => {
                  const fixtureResults = matchResults.filter(r => r.fixtureId === fixture.id);
                  const goalScorers = fixtureResults.filter(r => r.goalScorer);
                  const assists = fixtureResults.filter(r => r.assistBy);
                  
                  return (
                    <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', background: '#f9fafb' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ fontSize: '16px', fontWeight: '600' }}>
                          {fixture.homeTeam} vs {fixture.awayTeam}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669' }}>
                            {fixture.homeScore} - {fixture.awayScore}
                          </span>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>Round {fixture.round}</span>
                        </div>
                      </div>
                      
                      {goalScorers.length > 0 && (
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Goal Scorers: </span>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>
                            {goalScorers.map(g => g.goalScorer).join(', ')}
                          </span>
                        </div>
                      )}
                      
                      {assists.length > 0 && (
                        <div>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Assists: </span>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>
                            {assists.map(a => a.assistBy).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: '#6b7280' }}>No completed matches yet.</p>
            )}
          </div>
        </div>
      </Section>
    </Main>
  )
}