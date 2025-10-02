import Main from '../../../components/Main'
import Section from '../../../components/Section'

export default function GalleryManagement() {
  return (
    <Main>
      <Section title="Gallery Management">
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <button style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', marginBottom: '24px', cursor: 'pointer' }}>
            Upload Photos
          </button>
          <p style={{ color: '#6b7280' }}>Photo gallery management interface will be implemented here.</p>
        </div>
      </Section>
    </Main>
  )
}