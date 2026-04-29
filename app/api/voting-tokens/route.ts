import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ success: false, message: 'Token tidak ditemukan.' }, { status: 400 });
        }

        const votingToken = await prisma.votingToken.findUnique({
            where: { token },
            select: {
                token: true,
                sessionCode: true,
                expiresAt: true
            }
        });

        if (!votingToken) {
            return NextResponse.json({ success: false, message: 'Sesi QR tidak ditemukan.' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                token: votingToken.token,
                sessionCode: votingToken.sessionCode,
                expiresAt: votingToken.expiresAt,
                expired: new Date() > votingToken.expiresAt
            }
        });
    } catch (error) {
        console.error("GET VotingToken Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal membaca sesi QR' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sessionCode = String(body.sessionCode || '').trim().toUpperCase();

        if (!sessionCode) {
            return NextResponse.json({ success: false, message: 'Kode sesi wajib diisi.' }, { status: 400 });
        }

        // Token lama akan dibiarkan kadaluwarsa sendiri sesuai pengecekan (expiresAt) di saat orang mau vote

        // 2. Generate token unik & waktu expire (3 menit dari sekarang)
        const rawToken = crypto.randomBytes(16).toString('hex');
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 180 seconds

        const newToken = await prisma.votingToken.create({
            data: {
                token: rawToken,
                sessionCode,
                expiresAt
            }
        });

        await prisma.leaderboardSession.upsert({
            where: { sessionCode },
            update: {},
            create: { sessionCode, enabled: true }
        });

        // Hasilkan URL yang akan dimasukkan ke QRCode di Frontend
        // Saat mengakses URL ini user harus berada di HP
        return NextResponse.json({ 
            success: true, 
            data: {
                token: newToken.token,
                sessionCode: newToken.sessionCode,
                expiresAt: newToken.expiresAt,
                // Client side akan nempel hostname via window.location.origin
            } 
        });
    } catch (error) {
        console.error("POST VotingToken Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal membuat QR Token baru' }, { status: 500 });
    }
}
