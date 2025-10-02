'use client'
import Main from '../../components/Main'
import { FaUsers, FaCalendar, FaTrophy, FaCog } from 'react-icons/fa'

export default function AdminDashboard() {
  return (
    <Main>
      <div style={{ padding: '40px 16px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>
            Admin Dashboard
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <FaUsers style={{ fontSize: '32px', color: '#059669', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Manage Teams</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Add, edit, and organize teams</p>
              <a href="/dashboard/admin/teams" style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                View Teams
              </a>
            </div>
            
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <FaCalendar style={{ fontSize: '32px', color: '#2563eb', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Schedule Matches</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Create and manage fixtures</p>
              <a href="/dashboard/admin/matches" style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                Schedule
              </a>
            </div>
            
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <FaTrophy style={{ fontSize: '32px', color: '#ca8a04', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>League Management</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Manage league standings</p>
              <a href="/dashboard/admin/league" style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                Manage
              </a>
            </div>
            
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <FaCog style={{ fontSize: '32px', color: '#6b7280', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>System Settings</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Configure system preferences</p>
              <a href="/dashboard/admin/settings" style={{ background: '#6b7280', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                Settings
              </a>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', color: '#dc2626', marginBottom: '16px' }}>📰</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>News Management</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Create and manage news articles</p>
              <a href="/dashboard/admin/news-management" style={{ background: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                Manage News
              </a>
            </div>
            
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', color: '#7c3aed', marginBottom: '16px' }}>🖼️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Gallery Management</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>Upload and organize photos</p>
              <a href="/dashboard/admin/gallery-management" style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
                Manage Gallery
              </a>
            </div>
          </div>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Recent Activity</h2>
            <p style={{ color: '#6b7280' }}>No recent activity to display.</p>
          </div>
        </div>
      </div>
    </Main>
  )
}