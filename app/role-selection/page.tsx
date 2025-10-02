'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Main from '../components/Main'
import { FaUserTie, FaUsers } from 'react-icons/fa'

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState('')
  const router = useRouter()

  const handleRoleSelect = async (role: string) => {
    setSelectedRole(role)
    
    try {
      await fetch('/api/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })
      localStorage.setItem('userRole', role)
      router.push(`/dashboard/${role}`)
    } catch (error) {
      console.error('Failed to save role:', error)
    }
  }

  return (
    <Main>
      <div style={{ padding: '60px 16px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Choose Your Role
          </h1>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>
            Select how you'd like to use ReLeague U13
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div 
            onClick={() => handleRoleSelect('admin')}
            style={{ 
              background: 'white', 
              padding: '40px 32px', 
              borderRadius: '16px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
              cursor: 'pointer',
              border: '3px solid transparent',
              transition: 'all 0.3s',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#059669'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <FaUserTie style={{ fontSize: '48px', color: '#059669', marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#065f46', marginBottom: '12px' }}>
              Admin
            </h3>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
              Manage leagues, teams, fixtures, and overall system administration
            </p>
          </div>

          <div 
            onClick={() => handleRoleSelect('coach')}
            style={{ 
              background: 'white', 
              padding: '40px 32px', 
              borderRadius: '16px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
              cursor: 'pointer',
              border: '3px solid transparent',
              transition: 'all 0.3s',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2563eb'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <FaUsers style={{ fontSize: '48px', color: '#2563eb', marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#065f46', marginBottom: '12px' }}>
              Coach
            </h3>
            <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.5' }}>
              Manage your team, players, training sessions, and match reports
            </p>
          </div>
        </div>
      </div>
    </Main>
  )
}