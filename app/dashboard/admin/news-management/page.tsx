import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft } from 'react-icons/fa'

export default function NewsManagement() {
  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/admin" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="News Management">
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <button style={{ background: '#dc2626', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', marginBottom: '24px', cursor: 'pointer' }}>
            Create News Article
          </button>
          <p style={{ color: '#6b7280' }}>News article management interface will be implemented here.</p>
        </div>
      </Section>
    </Main>
  )
}