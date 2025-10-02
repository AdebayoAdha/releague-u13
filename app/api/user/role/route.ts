import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { users } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json()
    
    // Get user email from Stack Auth (you'll need to implement this)
    const userEmail = 'user@example.com' // Replace with actual user email from Stack Auth
    
    await db.insert(users).values({
      email: userEmail,
      role: role,
    }).onConflictDoUpdate({
      target: users.email,
      set: { role: role, updatedAt: new Date() }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save role' }, { status: 500 })
  }
}