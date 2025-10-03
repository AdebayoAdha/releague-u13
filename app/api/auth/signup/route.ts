import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '../../../../lib/db'
import { users, sessions } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }
    
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
    
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const newUser = await db.insert(users).values({
      email,
      password: hashedPassword,
    }).returning()
    
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    
    await db.insert(sessions).values({
      userId: newUser[0].id,
      token,
      expiresAt
    })
    
    const response = NextResponse.json({ success: true })
    
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60
    })
    
    return response
  } catch (error: any) {
    console.error('Signup error:', error)
    if (error.code === '23505') {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}