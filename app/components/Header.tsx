'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'

export default function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [hasTeam, setHasTeam] = useState(false)
  const pathname = usePathname()

  const fetchUserData = () => {
    const controller = new AbortController()
    
    fetch('/api/auth/me', { 
      signal: controller.signal,
      cache: 'no-store'
    })
      .then(res => {
        if (!res.ok) throw new Error('Auth failed')
        return res.json()
      })
      .then(data => {
        setIsSignedIn(data.authenticated)
        setUserRole(data.role || null)
        setHasTeam(data.hasTeam || false)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setIsSignedIn(false)
          setUserRole(null)
          setHasTeam(false)
        }
      })
    
    return () => controller.abort()
  }

  useEffect(() => {
    const cleanup = fetchUserData()
    return cleanup
  }, [pathname])

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <header style={{ background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/ReLeague.png" alt="ReLeague" width={60} height={60} style={{ marginRight: '12px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#065f46' }}>ReLeague U13</h1>
        </div>
        <nav role="navigation" aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center' }}>
          <a href="/" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="Home page">Home</a>
          <a href="/fixtures" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="Match fixtures">Fixtures</a>
          <a href="/results" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="Match results">Results</a>
          <a href="/table" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="League table">Table</a>
          <a href="/clubs" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="Football clubs">Clubs</a>
          <a href="/contact" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="Contact information">Contact</a>
          <a href="/gallery" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="Photo gallery">Gallery</a>
          <a href="/news" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="Latest news">News</a>
          <a href="/about" style={{ margin: '0 8px', color: '#065f46', textDecoration: 'none', padding: '8px' }} aria-label="About us">About</a>
          
          <div 
            style={{ position: 'relative', margin: '0 8px' }}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <div style={{ color: '#065f46', padding: '8px', fontSize: '18px', cursor: 'pointer' }}>
              <FaUser />
            </div>
            
            {showMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                background: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                borderRadius: '8px',
                padding: '8px 0',
                minWidth: '160px',
                zIndex: 1000
              }}>
                {isSignedIn ? (
                  <>
                    <a 
                      href={
                        !userRole ? '/role-selection' :
                        userRole === 'coach' && !hasTeam ? '/team-setup' :
                        `/dashboard/${userRole}`
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        color: '#065f46',
                        textDecoration: 'none',
                        fontSize: '14px'
                      }}
                    >
                      <FaTachometerAlt style={{ marginRight: '8px' }} />
                      {
                        !userRole ? 'Select Role' :
                        userRole === 'coach' && !hasTeam ? 'Setup Team' :
                        'Dashboard'
                      }
                    </a>
                    <button
                      onClick={handleSignOut}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '12px 16px',
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        fontSize: '14px',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <FaSignOutAlt style={{ marginRight: '8px' }} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <a 
                    href="/signin"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      color: '#065f46',
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    <FaUser style={{ marginRight: '8px' }} />
                    Sign In
                  </a>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}