import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft, FaUsers } from 'react-icons/fa'

export default function SystemSettings() {
  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/admin" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="System Settings">
        <div style={{ display: 'grid', gap: '24px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>General Settings</h3>
            <p style={{ color: '#6b7280' }}>System configuration options will be implemented here.</p>
          </div>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <FaUsers style={{ fontSize: '24px', color: '#059669', marginRight: '12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Users Management</h3>
            </div>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>Manage user accounts, roles, and permissions</p>
            <button style={{ background: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
              Manage Users
            </button>
          </div>
        </div>
      </Section>
    </Main>
  )
}