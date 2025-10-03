import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { sessions } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session')?.value
    
    if (sessionToken) {
      await db.delete(sessions).where(eq(sessions.token, sessionToken))
    }
    
    const response = NextResponse.json({ success: true })
    response.cookies.delete('session')
    
    return response
  } catch (error) {
    return NextResponse.json({ error: 'Sign out failed' }, { status: 500 })
  }
}