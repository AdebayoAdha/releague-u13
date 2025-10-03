import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { users, sessions, teams } from '../../../../lib/schema'
import { eq, and, gt } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
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
    
    const team = await db.select()
      .from(teams)
      .where(eq(teams.userId, session[0].users.id))
      .limit(1)
    
    if (!team.length) {
      return NextResponse.json({ error: 'No team found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, team: team[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get team' }, { status: 500 })
  }
}