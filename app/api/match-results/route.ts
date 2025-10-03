import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { matchResults } from '../../../lib/schema'

export async function GET() {
  try {
    const results = await db.select().from(matchResults)
    return NextResponse.json({ success: true, results })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch match results' }, { status: 500 })
  }
}