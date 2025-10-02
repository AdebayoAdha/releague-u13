import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '../../../../lib/db'
import { users } from '../../../../lib/schema'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(password, 12)
    
    await db.insert(users).values({
      email,
      password: hashedPassword,
    })
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Signup error:', error)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}