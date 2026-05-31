import { NextResponse } from 'next/server';
import { LEADERBOARD_DATA, SESSION_CODES } from '@/lib/leaderboard-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionCode = searchParams.get('sessionCode')?.trim().toUpperCase();

        if (sessionCode) {
            return NextResponse.json({ success: true, data: LEADERBOARD_DATA, sessionCode });
        }

        return NextResponse.json({ success: true, data: LEADERBOARD_DATA, sessionCodes: SESSION_CODES });
    } catch (error) {
        console.error("GET Leaderboard Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal mengambil data klasemen' }, { status: 500 });
    }
}
