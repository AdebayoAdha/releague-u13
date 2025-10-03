import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '../../../../lib/db'
import { users, sessions } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)
    
    if (!user.length || !await bcrypt.compare(password, user[0].password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    
    await db.insert(sessions).values({
      userId: user[0].id,
      token,
      expiresAt
    })
    
    const response = NextResponse.json({ 
      success: true, 
      role: user[0].role,
      email: user[0].email
    })
    
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })
    
    return response
  } catch (error) {
    return NextResponse.json({ error: 'Sign in failed' }, { status: 500 })
  }
}