import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { teams, fixtures } from '../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const allTeams = await db.select().from(teams)
    const allFixtures = await db.select().from(fixtures).where(eq(fixtures.status, 'completed'))

    const standings = allTeams.map(team => {
      const teamFixtures = allFixtures.filter(fixture => 
        fixture.homeTeam === team.teamName || fixture.awayTeam === team.teamName
      )

      let played = 0, won = 0, drawn = 0, lost = 0, gf = 0, ga = 0

      teamFixtures.forEach(fixture => {
        if (fixture.homeScore !== null && fixture.awayScore !== null) {
          played++
          
          if (fixture.homeTeam === team.teamName) {
            gf += fixture.homeScore
            ga += fixture.awayScore
            if (fixture.homeScore > fixture.awayScore) won++
            else if (fixture.homeScore === fixture.awayScore) drawn++
            else lost++
          } else {
            gf += fixture.awayScore
            ga += fixture.homeScore
            if (fixture.awayScore > fixture.homeScore) won++
            else if (fixture.awayScore === fixture.homeScore) drawn++
            else lost++
          }
        }
      })

      return {
        team: team.teamName,
        played,
        won,
        drawn,
        lost,
        gf,
        ga,
        gd: gf - ga,
        points: won * 3 + drawn
      }
    })

    standings.sort((a, b) => {
      const aOnlyLost = a.played > 0 && a.won === 0 && a.drawn === 0
      const bOnlyLost = b.played > 0 && b.won === 0 && b.drawn === 0
      
      if (aOnlyLost && bOnlyLost) {
        if (b.gd !== a.gd) return b.gd - a.gd
        return b.gf - a.gf
      }
      if (aOnlyLost) return 1
      if (bOnlyLost) return -1
      
      if (a.played === 0 && b.played === 0) return a.team.localeCompare(b.team)
      if (a.played === 0) return 1
      if (b.played === 0) return -1
      if (b.points !== a.points) return b.points - a.points
      if (b.gd !== a.gd) return b.gd - a.gd
      return b.gf - a.gf
    })
    
    const sortedStandings = standings
    const standingsWithPosition = sortedStandings.map((team, index) => ({
      ...team,
      position: index + 1
    }))

    return NextResponse.json(standingsWithPosition)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch standings' }, { status: 500 })
  }
}