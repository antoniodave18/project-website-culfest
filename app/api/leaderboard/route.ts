import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    
    try {
        const candidates = await prisma.candidate.findMany({
            include: {
                _count: {
                    select: { votes: true }
                }
            },
            orderBy: {
                votes: {
                    _count: 'desc'
                }
            }
        });

        // Format data agar _count.votes menjadi property voteCount di tingkat luar
        const formattedData = candidates.map(c => ({
            id: c.id,
            name: c.name,
            imageUrl: c.imageUrl,
            voteCount: c._count.votes
        }));

        return NextResponse.json({ success: true, data: formattedData });
    } catch (error) {
        console.error("GET Leaderboard Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal mengambil data klasemen' }, { status: 500 });
    }
}
