import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { teams } from '../../../lib/schema'

export async function GET() {
  try {
    const allTeams = await db.select().from(teams)
    return NextResponse.json(allTeams)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 })
  }
}