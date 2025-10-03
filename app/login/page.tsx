'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  
  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    const userEmail = localStorage.getItem('userEmail')
    
    if (userRole && userEmail) {
      router.push(`/dashboard/${userRole}`)
    } else {
      router.push('/signin')
    }
  }, [router])
  
  return null
}