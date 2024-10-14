import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    const platforms = await prisma.platform.findMany()
    return NextResponse.json(platforms)
}

export async function POST(request) {
    const { name } = await request.json()
    const platform = await prisma.platform.create({
        data: { name }
    })
    return NextResponse.json(platform, { status: 201 })
}