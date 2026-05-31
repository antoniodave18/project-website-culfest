import { NextResponse } from 'next/server';
import { SESSION_CODES } from '@/lib/leaderboard-data';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const sessions = SESSION_CODES.map((sessionCode) => ({
            sessionCode,
            enabled: true,
            voteCount: 0,
            createdAt: null
        }));

        return NextResponse.json({ success: true, data: sessions });
    } catch (error) {
        console.error('GET LeaderboardSessions Error:', error);
        return NextResponse.json({ success: false, message: 'Gagal mengambil sesi leaderboard.' }, { status: 500 });
    }
}

export async function PUT(_request: Request) {
    try {
        return NextResponse.json(
            { success: false, message: 'Voting sedang dinonaktifkan.' },
            { status: 403 }
        );
    } catch (error) {
        console.error('PUT LeaderboardSessions Error:', error);
        return NextResponse.json({ success: false, message: 'Gagal menyimpan pengaturan sesi leaderboard.' }, { status: 500 });
    }
}
