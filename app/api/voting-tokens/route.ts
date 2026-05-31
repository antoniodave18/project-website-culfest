import { NextResponse } from 'next/server';

export async function GET(_request: Request) {
    try {
        return NextResponse.json(
            { success: false, message: 'Voting sedang dinonaktifkan.' },
            { status: 403 }
        );
    } catch (error) {
        console.error("GET VotingToken Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal membaca sesi QR' }, { status: 500 });
    }
}

export async function POST(_request: Request) {
    try {
        return NextResponse.json(
            { success: false, message: 'Voting sedang dinonaktifkan.' },
            { status: 403 }
        );
    } catch (error) {
        console.error("POST VotingToken Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal membuat QR Token baru' }, { status: 500 });
    }
}
