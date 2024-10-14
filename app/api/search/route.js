import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const where = buildWhereClause(searchParams);

    const movies = await prisma.movie.findMany({
        where,
        include: {
            platforms: {
                include: {
                    platform: true
                }
            }
        }
    });

    return NextResponse.json(movies);
}

function buildWhereClause(searchParams) {
    const title = searchParams.get('title');
    const language = searchParams.get('language');
    const platform = searchParams.get('platform');

    const where = {};

    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (language) where.language = language;
    if (platform) {
        where.platforms = {
            some: {
                platform: {
                    name: platform
                }
            }
        };
    }

    return where;
}
