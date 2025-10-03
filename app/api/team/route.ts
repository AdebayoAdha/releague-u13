import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { db } from '../../../lib/db'
import { teams } from '../../../lib/schema'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const teamData = await db.select().from(teams).limit(1);
    
    if (teamData.length > 0) {
      return NextResponse.json({ team: teamData[0] });
    } else {
      return NextResponse.json({ team: null });
    }
  } catch (error) {
    console.error('Team fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const teamName = formData.get('teamName') as string
    const teamCoach = formData.get('teamCoach') as string
    const teamLogo = formData.get('teamLogo') as File | null
    const coachImage = formData.get('coachImage') as File | null
    
    let teamLogoUrl = null
    let coachImageUrl = null
    
    // Upload team logo to Cloudinary
    if (teamLogo) {
      const logoBuffer = Buffer.from(await teamLogo.arrayBuffer())
      const logoResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'team-logos' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(logoBuffer)
      }) as any
      teamLogoUrl = logoResult.secure_url
    }
    
    // Upload coach image to Cloudinary
    if (coachImage) {
      const coachBuffer = Buffer.from(await coachImage.arrayBuffer())
      const coachResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'coach-images' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(coachBuffer)
      }) as any
      coachImageUrl = coachResult.secure_url
    }
    
    await db.insert(teams).values({
      teamName,
      teamCoach,
      teamLogo: teamLogoUrl,
      coachImage: coachImageUrl,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Team save error:', error)
    return NextResponse.json({ error: 'Failed to save team' }, { status: 500 })
  }
}