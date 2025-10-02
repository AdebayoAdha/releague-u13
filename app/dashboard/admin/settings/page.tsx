import Main from '../../../components/Main'
import Section from '../../../components/Section'

export default function SystemSettings() {
  return (
    <Main>
      <Section title="System Settings">
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>General Settings</h3>
          <p style={{ color: '#6b7280' }}>System configuration options will be implemented here.</p>
        </div>
      </Section>
    </Main>
  )
}