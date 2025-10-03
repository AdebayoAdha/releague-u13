import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { db } from '../../../../lib/db'
import { users, sessions, teams } from '../../../../lib/schema'
import { eq, and, gt } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const teamLogo = formData.get('teamLogo') as File
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
    
    const bytes = await teamLogo.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${teamLogo.name}`
    const path = join(process.cwd(), 'public/uploads', filename)
    await writeFile(path, buffer)
    const teamLogoPath = `/uploads/${filename}`
    
    await db.update(teams)
      .set({ teamLogo: teamLogoPath, updatedAt: new Date() })
      .where(eq(teams.userId, session[0].users.id))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team logo' }, { status: 500 })
  }
}