import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { teams, fixtures } from '../../../../lib/schema'

export async function POST(request: NextRequest) {
  try {
    const allTeams = await db.select().from(teams)
    
    if (allTeams.length < 2) {
      return NextResponse.json({ error: 'Need at least 2 teams to generate fixtures' }, { status: 400 })
    }

    const generatedFixtures = generateRoundRobinFixtures(allTeams)
    
    // Save fixtures to database and get IDs
    let savedFixtures = []
    if (generatedFixtures.length > 0) {
      savedFixtures = await db.insert(fixtures).values(
        generatedFixtures.map(fixture => ({
          round: fixture.round,
          leg: fixture.leg,
          homeTeamId: fixture.homeTeamId || null,
          awayTeamId: fixture.awayTeamId || null,
          homeTeam: fixture.homeTeam,
          awayTeam: fixture.awayTeam,
          status: fixture.status,
          matchDate: null,
          venue: fixture.venue || 'TBD'
        }))
      ).returning()
    }
    
    return NextResponse.json({ 
      success: true, 
      fixtures: savedFixtures.length > 0 ? savedFixtures : generatedFixtures,
      totalMatches: generatedFixtures.length,
      totalRounds: Math.ceil(generatedFixtures.length / Math.floor(allTeams.length / 2))
    })
  } catch (error) {
    console.error('Fixture generation error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate fixtures', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

function generateRoundRobinFixtures(teams: any[]) {
  const teamCount = teams.length
  
  // Add bye team if odd number
  const teamsWithBye = teamCount % 2 === 1 ? [...teams, { id: 'bye', teamName: 'BYE' }] : teams
  const teamNames = teamsWithBye.map(t => t.teamName)
  
  const schedule = roundRobinRotation(teamNames)
  const fixtures = []
  
  schedule.forEach((round, roundIndex) => {
    round.forEach(([homeTeamName, awayTeamName]) => {
      // Skip BYE matches
      if (homeTeamName !== 'BYE' && awayTeamName !== 'BYE') {
        const homeTeam = teamsWithBye.find(t => t.teamName === homeTeamName)
        const awayTeam = teamsWithBye.find(t => t.teamName === awayTeamName)
        
        fixtures.push({
          round: roundIndex + 1,
          leg: 1,
          homeTeam: homeTeamName,
          awayTeam: awayTeamName,
          homeTeamId: homeTeam?.id,
          awayTeamId: awayTeam?.id,
          status: 'scheduled',
          date: null,
          venue: 'TBD'
        })
      }
    })
  })
  
  return fixtures
}

function roundRobinRotation(teams: string[]) {
  const n = teams.length
  if (n % 2 !== 0) {
    throw new Error('Number of teams must be even for this method.')
  }
  const rounds = []
  let currentTeams = [...teams]
  
  for (let i = 0; i < n - 1; i++) {
    const roundMatches = []
    for (let j = 0; j < n / 2; j++) {
      const home = currentTeams[j]
      const away = currentTeams[n - 1 - j]
      roundMatches.push([home, away])
    }
    rounds.push(roundMatches)
    
    // Rotate: fix first team, move last to second position, shift the rest
    const first = currentTeams[0]
    const last = currentTeams[n - 1]
    currentTeams = [first, last, ...currentTeams.slice(1, n - 1)]
  }
  return rounds
}

