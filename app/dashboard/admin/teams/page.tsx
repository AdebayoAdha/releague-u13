import Main from '../../../components/Main'
import Section from '../../../components/Section'

export default function ManageTeams() {
  return (
    <Main>
      <Section title="Manage Teams">
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <button style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', marginBottom: '24px', cursor: 'pointer' }}>
            Add New Team
          </button>
          <p style={{ color: '#6b7280' }}>Team management interface will be implemented here.</p>
        </div>
      </Section>
    </Main>
  )
}