import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const [tokenSessions, voteSessions, settings] = await Promise.all([
            prisma.votingToken.findMany({
                distinct: ['sessionCode'],
                select: {
                    sessionCode: true,
                    createdAt: true
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.vote.groupBy({
                by: ['sessionCode'],
                _count: { id: true }
            }),
            prisma.leaderboardSession.findMany()
        ]);

        const voteCountBySession = new Map(voteSessions.map((session) => [session.sessionCode, session._count.id]));
        const settingBySession = new Map(settings.map((setting) => [setting.sessionCode, setting]));
        const sessionCodes = Array.from(new Set([
            ...tokenSessions.map((session) => session.sessionCode),
            ...voteSessions.map((session) => session.sessionCode),
            ...settings.map((setting) => setting.sessionCode)
        ])).filter(Boolean);

        const sessions = sessionCodes
            .map((sessionCode) => {
                const tokenSession = tokenSessions.find((session) => session.sessionCode === sessionCode);
                const setting = settingBySession.get(sessionCode);

                return {
                    sessionCode,
                    enabled: setting?.enabled ?? true,
                    voteCount: voteCountBySession.get(sessionCode) ?? 0,
                    createdAt: tokenSession?.createdAt ?? setting?.createdAt ?? null
                };
            })
            .sort((a, b) => {
                const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return timeB - timeA;
            });

        return NextResponse.json({ success: true, data: sessions });
    } catch (error) {
        console.error('GET LeaderboardSessions Error:', error);
        return NextResponse.json({ success: false, message: 'Gagal mengambil sesi leaderboard.' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const enabledSessionCodes = Array.isArray(body.enabledSessionCodes)
            ? body.enabledSessionCodes.map((code: unknown) => String(code).trim().toUpperCase()).filter(Boolean)
            : [];

        const [tokenSessions, voteSessions, settings] = await Promise.all([
            prisma.votingToken.findMany({ distinct: ['sessionCode'], select: { sessionCode: true } }),
            prisma.vote.findMany({ distinct: ['sessionCode'], select: { sessionCode: true } }),
            prisma.leaderboardSession.findMany({ select: { sessionCode: true } })
        ]);

        const sessionCodes = Array.from(new Set([
            ...tokenSessions.map((session) => session.sessionCode),
            ...voteSessions.map((session) => session.sessionCode),
            ...settings.map((setting) => setting.sessionCode)
        ])).filter(Boolean);

        await prisma.$transaction(
            sessionCodes.map((sessionCode) => prisma.leaderboardSession.upsert({
                where: { sessionCode },
                update: { enabled: enabledSessionCodes.includes(sessionCode) },
                create: {
                    sessionCode,
                    enabled: enabledSessionCodes.includes(sessionCode)
                }
            }))
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('PUT LeaderboardSessions Error:', error);
        return NextResponse.json({ success: false, message: 'Gagal menyimpan pengaturan sesi leaderboard.' }, { status: 500 });
    }
}
