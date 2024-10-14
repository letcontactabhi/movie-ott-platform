import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    const { movieId, platformId, availabilityStatus } = await request.json()
    
    const link = await prisma.platformOnMovie.create({
        data: {
            movieId: parseInt(movieId),
            platformId: parseInt(platformId),
            availabilityStatus
        }
    })
    
    return NextResponse.json(link, { status: 201 })
}
