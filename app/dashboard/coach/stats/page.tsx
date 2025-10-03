import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft } from 'react-icons/fa'

export default function TeamStats() {
  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/coach" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="Team Stats">
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>Performance Overview</h3>
          <p style={{ color: '#6b7280' }}>Team statistics and performance metrics will be displayed here.</p>
        </div>
      </Section>
    </Main>
  )
}