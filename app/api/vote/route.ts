import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { candidateId, token } = body;

        if (!candidateId || !token) {
            return NextResponse.json({ success: false, message: 'Validasi gagal, data tidak lengkap.' }, { status: 400 });
        }

        // 1. Verifikasi Token
        const activeToken = await prisma.votingToken.findUnique({
            where: { token }
        });

        if (!activeToken) {
            return NextResponse.json({ success: false, message: 'Mohon maaf, sesi QR ini sudah ditutup. Silakan scan ulang QR yang baru ya.' }, { status: 403 });
        }

        if (new Date() > activeToken.expiresAt) {
            return NextResponse.json({ success: false, message: 'Mohon maaf, waktu untuk memilih sudah habis. Yuk, silakan scan ulang QR yang baru.' }, { status: 403 });
        }

        // 2. Registrasi Vote
        const vote = await prisma.vote.create({
            data: {
                candidateId,
                votingTokenId: activeToken.id,
                sessionCode: activeToken.sessionCode
            }
        });

        return NextResponse.json({
            success: true,
            data: {
                ...vote,
                sessionCode: activeToken.sessionCode
            }
        });
    } catch (error) {
        console.error("POST Vote Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal melakukan voting akibat gangguan server.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionCode = searchParams.get('sessionCode')?.trim().toUpperCase();

        if (!sessionCode) {
            return NextResponse.json({ success: false, message: 'Kode sesi wajib diisi.' }, { status: 400 });
        }

        const result = await prisma.vote.deleteMany({
            where: { sessionCode }
        });

        return NextResponse.json({
            success: true,
            sessionCode,
            deletedCount: result.count
        });
    } catch (error) {
        console.error("DELETE Vote Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal mereset hasil voting.' }, { status: 500 });
    }
}
