import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { users, sessions } from '../../../../lib/schema'
import { eq, and, gt } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json()
    const sessionToken = request.cookies.get('session')?.value
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    
    const session = await db.select()
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(and(
        eq(sessions.token, sessionToken),
        gt(sessions.expiresAt, new Date())
      ))
      .limit(1)
    
    if (!session.length) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }
    
    await db.update(users)
      .set({ role: role, updatedAt: new Date() })
      .where(eq(users.id, session[0].users.id))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save role' }, { status: 500 })
  }
}