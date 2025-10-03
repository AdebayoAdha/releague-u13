import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { fixtures as fixturesTable } from '../../../lib/schema'

export async function GET() {
  try {
    const allFixtures = await db.select().from(fixturesTable)
    return NextResponse.json({ success: true, fixtures: allFixtures })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch fixtures' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await db.delete(fixturesTable)
    return NextResponse.json({ success: true, message: 'All fixtures deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete fixtures' }, { status: 500 })
  }
}