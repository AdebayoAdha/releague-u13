import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '../../../../lib/db'
import { users } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)
    
    if (!user.length || !await bcrypt.compare(password, user[0].password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    return NextResponse.json({ 
      success: true, 
      role: user[0].role,
      email: user[0].email 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Sign in failed' }, { status: 500 })
  }
}