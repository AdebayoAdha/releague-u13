'use client'
import Main from '../../components/Main'
import { FaUsers, FaClipboardList, FaChartLine, FaCalendarAlt } from 'react-icons/fa'

export default function CoachDashboard() {
  return (
    <Main>
      <div style={{ padding: '40px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>
            Coach Dashboard
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <FaUsers style={{ fontSize: '32px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>My Team</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Manage players and roster</p>
              <button style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
                View Team
              </button>
            </div>
            
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <FaCalendarAlt style={{ fontSize: '32px', color: '#2563eb', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Training Sessions</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Schedule and track training</p>
              <button style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
                Schedule
              </button>
            </div>
            
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <FaClipboardList style={{ fontSize: '32px', color: '#ca8a04', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Match Reports</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Submit and view match reports</p>
              <button style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
                Reports
              </button>
            </div>
            
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <FaChartLine style={{ fontSize: '32px', color: '#dc2626', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Team Stats</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>View team performance</p>
              <button style={{ background: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
                View Stats
              </button>
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