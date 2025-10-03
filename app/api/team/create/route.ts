import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { db } from '../../../../lib/db'
import { users, sessions, teams } from '../../../../lib/schema'
import { eq, and, gt } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const teamName = formData.get('teamName') as string
    const teamCoach = formData.get('teamCoach') as string
    const teamLogo = formData.get('teamLogo') as File | null
    const coachImage = formData.get('coachImage') as File | null
    const isUpdate = formData.get('isUpdate') === 'true'
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
    
    const existingTeam = await db.select()
      .from(teams)
      .where(eq(teams.userId, session[0].users.id))
      .limit(1)
    
    let teamLogoPath = null
    let coachImagePath = null
    
    if (teamLogo) {
      const bytes = await teamLogo.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${teamLogo.name}`
      const path = join(process.cwd(), 'public/uploads', filename)
      await writeFile(path, buffer)
      teamLogoPath = `/uploads/${filename}`
    }
    
    if (coachImage) {
      const bytes = await coachImage.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${coachImage.name}`
      const path = join(process.cwd(), 'public/uploads', filename)
      await writeFile(path, buffer)
      coachImagePath = `/uploads/${filename}`
    }
    
    if (isUpdate && existingTeam.length > 0) {
      await db.update(teams)
        .set({ 
          teamName, 
          teamCoach, 
          ...(teamLogoPath && { teamLogo: teamLogoPath }),
          ...(coachImagePath && { coachImage: coachImagePath }),
          updatedAt: new Date() 
        })
        .where(eq(teams.userId, session[0].users.id))
    } else if (!isUpdate && existingTeam.length > 0) {
      return NextResponse.json({ error: 'User already has a team' }, { status: 400 })
    } else {
      await db.insert(teams).values({
        teamName,
        teamCoach,
        teamLogo: teamLogoPath,
        coachImage: coachImagePath,
        userId: session[0].users.id
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 })
  }
}