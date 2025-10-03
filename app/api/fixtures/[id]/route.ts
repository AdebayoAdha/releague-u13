import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { fixtures as fixturesTable } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { date, time, venue } = await request.json()
    const { id: fixtureId } = await params
    
    // Save date separately without combining with time
    let matchDate = null
    if (date) {
      matchDate = new Date(date)
    }
    
    await db.update(fixturesTable)
      .set({ 
        matchDate,
        matchTime: time || null,
        venue: venue || 'TBD'
      })
      .where(eq(fixturesTable.id, fixtureId))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update fixture' }, { status: 500 })
  }
}