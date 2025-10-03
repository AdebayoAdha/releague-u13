"use client";
import { useState, useEffect } from 'react';
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft, FaTrophy, FaTable, FaCalendar } from 'react-icons/fa'

export default function LeagueManagement() {
  const [teams, setTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    fetch('/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(() => {});

    fetch('/api/fixtures')
      .then(res => res.json())
      .then(data => data.success && setFixtures(data.fixtures))
      .catch(() => {});
  }, []);

  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/admin" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="League Management">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: 'linear-gradient(135deg, #ca8a04, #a16207)', padding: '24px', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
            <FaTrophy style={{ fontSize: '32px', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Current Season</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>2024/25</p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', padding: '24px', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
            <FaCalendar style={{ fontSize: '32px', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Total Matches</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{fixtures.length}</p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', padding: '24px', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
            <FaTable style={{ fontSize: '32px', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Teams</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{teams.length}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="/table" style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
                View League Table
              </a>
              <a href="/fixtures" style={{ background: '#2563eb', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
                View Fixtures
              </a>
              <a href="/dashboard/admin/update-results" style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
                Update Results
              </a>
            </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>League Status</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span>Scheduled Matches:</span>
                <span style={{ fontWeight: 'bold' }}>{fixtures.filter(f => f.status === 'scheduled').length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span>Completed Matches:</span>
                <span style={{ fontWeight: 'bold' }}>{fixtures.filter(f => f.status === 'completed').length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span>Active Teams:</span>
                <span style={{ fontWeight: 'bold' }}>{teams.length}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Main>
  )
}