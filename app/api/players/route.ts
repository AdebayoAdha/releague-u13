import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { players, users, sessions } from '@/lib/schema'
import { eq, and, gt } from 'drizzle-orm'
import { v2 as cloudinary } from 'cloudinary'

async function getUserFromSession(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value
  if (!sessionToken) return null
  
  const session = await db.select({
    userId: sessions.userId,
    user: users
  })
  .from(sessions)
  .innerJoin(users, eq(sessions.userId, users.id))
  .where(and(
    eq(sessions.token, sessionToken),
    gt(sessions.expiresAt, new Date())
  ))
  .limit(1)
  
  return session.length ? session[0] : null
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const userSession = await getUserFromSession(request)
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const formData = await request.formData()
    const name = formData.get('name') as string
    const dateOfBirth = formData.get('dateOfBirth') as string
    const position = formData.get('position') as string
    const number = parseInt(formData.get('number') as string)
    const image = formData.get('image') as File | null
    const userId = userSession.userId

    let imageUrl = null
    if (image) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'image', folder: 'players' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(buffer)
      }) as any
      
      imageUrl = result.secure_url
    }

    const newPlayer = await db.insert(players).values({
      name,
      dateOfBirth,
      position,
      number,
      image: imageUrl,
      userId,
    }).returning()

    return NextResponse.json({ success: true, player: newPlayer[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save player' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userSession = await getUserFromSession(request)
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userPlayers = await db.select().from(players).where(eq(players.userId, userSession.userId))
    return NextResponse.json({ players: userPlayers })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userSession = await getUserFromSession(request)
    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const formData = await request.formData()
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const dateOfBirth = formData.get('dateOfBirth') as string
    const position = formData.get('position') as string
    const number = parseInt(formData.get('number') as string)

    await db.update(players)
      .set({ name, dateOfBirth, position, number })
      .where(eq(players.id, id))
    
    const updatedPlayer = await db.select().from(players).where(eq(players.id, id)).limit(1)

    return NextResponse.json({ success: true, player: updatedPlayer[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update player' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const playerId = searchParams.get('id')

    if (!playerId) {
      return NextResponse.json({ error: 'Player ID required' }, { status: 400 })
    }

    await db.delete(players).where(eq(players.id, playerId))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete player' }, { status: 500 })
  }
}