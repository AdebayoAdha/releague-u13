import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { fixtures as fixturesTable, matchResults } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { fixtureId, homeScore, awayScore } = data
    
    // Update fixtures table with scores only
    await db.update(fixturesTable)
      .set({ 
        homeScore: parseInt(homeScore), 
        awayScore: parseInt(awayScore), 
        status: 'completed' 
      })
      .where(eq(fixturesTable.id, fixtureId))
    
    // Collect all match results data from form inputs
    const matchResultsData = []
    
    // Process goal scorers and assists from form data
    Object.keys(data).forEach(key => {
      if (key.includes('_scorer_') && data[key]) {
        const assistKey = key.replace('_scorer_', '_assist_')
        const timeKey = key.replace('_scorer_', '_time_')
        
        matchResultsData.push({
          fixtureId,
          goalScorer: data[key],
          assistBy: data[assistKey] || null
        })
      }
      
      // Process clean sheets
      if (key.includes('_cleansheet') && data[key]) {
        matchResultsData.push({
          fixtureId,
          cleanSheet: data[key]
        })
      }
    })
    
    // Save to matchResults table if there's data
    if (matchResultsData.length > 0) {
      await db.insert(matchResults).values(matchResultsData)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update result error:', error)
    return NextResponse.json({ error: 'Failed to update result' }, { status: 500 })
  }
}