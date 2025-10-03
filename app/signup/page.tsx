'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Main from '../components/Main'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        const data = await res.json()
        router.push('/role-selection')
      } else {
        const errorData = await res.json()
        alert(errorData.error || 'Sign up failed')
      }
    } catch (error) {
      alert('Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Main>
      <div style={{ padding: '60px 16px', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '40px' }}>
          <h1 style={{ color: '#065f46', fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px' }}>
            Join ReLeague U13
          </h1>
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '16px'
              }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            Already have an account?{' '}
            <a href="/signin" style={{ color: '#059669', fontWeight: '600', textDecoration: 'none' }}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </Main>
  )
}