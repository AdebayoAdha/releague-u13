import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { news } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content, status, image } = await request.json()
    const id = parseInt(params.id)
    
    const updatedArticle = await db.update(news)
      .set({ title, content, status, image })
      .where(eq(news.id, id))
      .returning()

    return NextResponse.json({ article: updatedArticle[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    
    await db.delete(news).where(eq(news.id, id))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}