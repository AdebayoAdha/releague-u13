import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { gallery } from '../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    
    await db.delete(gallery).where(eq(gallery.id, id))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
}