import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { gallery } from '../../../lib/schema'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const photos = await db.select().from(gallery).orderBy(desc(gallery.createdAt))
    return NextResponse.json({ photos })
  } catch (error) {
    console.error('Gallery fetch error:', error)
    return NextResponse.json({ photos: [] })
  }
}

export async function POST(request: Request) {
  try {
    const { title, album, image } = await request.json()
    
    const newPhoto = await db.insert(gallery).values({
      title,
      album,
      image,
      createdAt: new Date().toISOString()
    }).returning()

    return NextResponse.json({ photo: newPhoto[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload photo' }, { status: 500 })
  }
}