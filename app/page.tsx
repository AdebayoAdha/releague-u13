import Main from './components/Main'
import Section from './components/Section'

export default function Home() {
  return (
    <Main>
      <div style={{ background: 'linear-gradient(to right, #059669, #065f46)', color: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Welcome to ReLeague U13</h1>
          <p style={{ fontSize: '20px', opacity: 0.9 }}>Premier Youth Football League</p>
        </div>
      </div>
      
      <Section title="Quick Access">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚽</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#065f46' }}>Fixtures</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>View upcoming matches and schedule</p>
            <button style={{ background: '#059669', color: 'white', padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>View Fixtures</button>
          </div>
          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#065f46' }}>Results</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>Latest match results and scores</p>
            <button style={{ background: '#2563eb', color: 'white', padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>View Results</button>
          </div>
          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderLeft: '4px solid #eab308' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#065f46' }}>League Table</h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>Current standings and statistics</p>
            <button style={{ background: '#ca8a04', color: 'white', padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>View Table</button>
          </div>
        </div>
      </Section>
    </Main>
  )
}