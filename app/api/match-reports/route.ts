import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { matchReports, users, sessions } from '../../../lib/schema'
import { eq, and, gt } from 'drizzle-orm'

async function getUserFromSession(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value
  if (!sessionToken) return null
  
  const session = await db.select({
    userId: sessions.userId,
    user: users
  })
  .from(sessions)
  .innerJoin(users, eq(sessions.userId, users.id))
  .where(and(
    eq(sessions.token, sessionToken),
    gt(sessions.expiresAt, new Date())
  ))
  .limit(1)
  
  return session.length ? session[0] : null
}

export async function POST(request: NextRequest) {
  try {
    const userSession = await getUserFromSession(request)
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { fixtureId, selectedPlayers } = await request.json()
    
    await db.insert(matchReports).values({
      fixtureId,
      userId: userSession.userId,
      selectedPlayers: JSON.stringify(selectedPlayers)
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Match report error:', error)
    return NextResponse.json({ error: 'Failed to save match report' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userSession = await getUserFromSession(request)
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const reports = await db.select().from(matchReports).where(eq(matchReports.userId, userSession.userId))
    return NextResponse.json({ success: true, reports })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch match reports' }, { status: 500 })
  }
}