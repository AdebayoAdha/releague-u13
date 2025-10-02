'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  
  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    if (userRole) {
      router.push('/')
    } else {
      router.push('/signin')
    }
  }, [router])
  
  return null
}