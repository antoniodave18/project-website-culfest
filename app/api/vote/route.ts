import { NextResponse } from 'next/server';

export async function POST(_request: Request) {
    try {
        return NextResponse.json(
            { success: false, message: 'Voting sedang dinonaktifkan.' },
            { status: 403 }
        );
    } catch (error) {
        console.error("POST Vote Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal melakukan voting akibat gangguan server.' }, { status: 500 });
    }
}

export async function DELETE(_request: Request) {
    try {
        return NextResponse.json(
            { success: false, message: 'Voting sedang dinonaktifkan.' },
            { status: 403 }
        );
    } catch (error) {
        console.error("DELETE Vote Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal mereset hasil voting.' }, { status: 500 });
    }
}
