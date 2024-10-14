// app/api/movies/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET() {
    const movies = await prisma.movie.findMany({
        include: {
            platforms: {
                include: {
                    platform: true
                }
            }
        }
    })
    return NextResponse.json(movies)
}

export async function POST(request) {
    const { title, year, language } = await request.json()
    const movie = await prisma.movie.create({
        data: { title, year: parseInt(year), language }
    })
    return NextResponse.json(movie, { status: 201 })
}
