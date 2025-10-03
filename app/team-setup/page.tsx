'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Main from '../components/Main'

export default function TeamSetup() {
  const [teamName, setTeamName] = useState('')
  const [teamCoach, setTeamCoach] = useState('')
  const [teamLogo, setTeamLogo] = useState<File | null>(null)
  const [coachImage, setCoachImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/signin')
        } else if (data.hasTeam) {
          router.push('/team-edit')
        }
      })
      .catch(() => router.push('/signin'))
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('teamName', teamName)
      formData.append('teamCoach', teamCoach)
      if (teamLogo) formData.append('teamLogo', teamLogo)
      if (coachImage) formData.append('coachImage', coachImage)
      
      const response = await fetch('/api/team/create', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        router.push('/dashboard/coach')
      } else {
        alert('Failed to create team')
      }
    } catch (error) {
      alert('Failed to create team')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Main>
      <div style={{ padding: '60px 16px', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '40px' }}>
          <h1 style={{ color: '#065f46', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px' }}>
            Setup Your Team
          </h1>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              style={{
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '14px 16px',
                fontSize: '16px',
                width: '100%',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="text"
              placeholder="Coach Name"
              value={teamCoach}
              onChange={(e) => setTeamCoach(e.target.value)}
              required
              style={{
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '14px 16px',
                fontSize: '16px',
                width: '100%',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setTeamLogo(e.target.files?.[0] || null)}
              style={{
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '14px 16px',
                fontSize: '16px',
                width: '100%',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />
            <label style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Team Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoachImage(e.target.files?.[0] || null)}
              style={{
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '14px 16px',
                fontSize: '16px',
                width: '100%',
                marginBottom: '24px',
                boxSizing: 'border-box'
              }}
            />
            <label style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Coach Image</label>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 24px',
                fontSize: '16px',
                fontWeight: '600',
                width: '100%',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating Team...' : 'Create Team'}
            </button>
          </form>
        </div>
      </div>
    </Main>
  )
}