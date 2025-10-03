import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { users, sessions, teams } from '../../../../lib/schema'
import { eq, and, gt } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session')?.value
    
    if (!sessionToken) {
      return NextResponse.json({ authenticated: false })
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
      return NextResponse.json({ authenticated: false })
    }
    
    const userTeam = await db.select()
      .from(teams)
      .where(eq(teams.userId, session[0].users.id))
      .limit(1)
    
    return NextResponse.json({
      authenticated: true,
      email: session[0].users.email,
      role: session[0].users.role,
      hasTeam: userTeam.length > 0
    })
  } catch (error) {
    return NextResponse.json({ authenticated: false })
  }
}