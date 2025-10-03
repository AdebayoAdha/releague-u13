import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { news } from '../../../lib/schema'

export async function GET() {
  try {
    const articles = await db.select().from(news).orderBy(news.createdAt)
    return NextResponse.json({ articles })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, status, image } = await request.json()
    
    const newArticle = await db.insert(news).values({
      title,
      content,
      status,
      image,
      author: 'Admin',
      createdAt: new Date().toISOString()
    }).returning()

    return NextResponse.json({ article: newArticle[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}