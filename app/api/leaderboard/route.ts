import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    
    try {
        const { searchParams } = new URL(request.url);
        const sessionCode = searchParams.get('sessionCode')?.trim().toUpperCase();

        const formatCandidatesForSessions = async (sessionCodes: string[]) => {
            const candidates = await prisma.candidate.findMany({
                include: {
                    votes: {
                        where: {
                            sessionCode: {
                                in: sessionCodes
                            }
                        },
                        select: { id: true }
                    }
                }
            });

            return candidates
                .map(c => ({
                    id: c.id,
                    name: c.name,
                    imageUrl: c.imageUrl,
                    voteCount: c.votes.length
                }))
                .sort((a, b) => b.voteCount - a.voteCount);
        };

        if (sessionCode) {
            const formattedData = await formatCandidatesForSessions([sessionCode]);

            return NextResponse.json({ success: true, data: formattedData, sessionCode });
        }

        const configuredSessions = await prisma.leaderboardSession.findMany({
            where: { enabled: true },
            select: { sessionCode: true }
        });

        const anyConfiguredSession = await prisma.leaderboardSession.findFirst({
            select: { id: true }
        });

        if (anyConfiguredSession) {
            const enabledSessionCodes = configuredSessions.map((session) => session.sessionCode);
            const formattedData = enabledSessionCodes.length > 0
                ? await formatCandidatesForSessions(enabledSessionCodes)
                : (await prisma.candidate.findMany()).map(c => ({
                    id: c.id,
                    name: c.name,
                    imageUrl: c.imageUrl,
                    voteCount: 0
                }));

            return NextResponse.json({ success: true, data: formattedData, sessionCodes: enabledSessionCodes });
        }

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
