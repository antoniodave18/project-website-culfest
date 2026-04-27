import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export async function POST() {
    try {
        // Token lama akan dibiarkan kadaluwarsa sendiri sesuai pengecekan (expiresAt) di saat orang mau vote

        // 2. Generate token unik & waktu expire (5 menit dari sekarang)
        const rawToken = crypto.randomBytes(16).toString('hex');
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 300 seconds

        const newToken = await prisma.votingToken.create({
            data: {
                token: rawToken,
                expiresAt
            }
        });

        // Hasilkan URL yang akan dimasukkan ke QRCode di Frontend
        // Saat mengakses URL ini user harus berada di HP
        return NextResponse.json({ 
            success: true, 
            data: {
                token: newToken.token,
                expiresAt: newToken.expiresAt,
                // Client side akan nempel hostname via window.location.origin
            } 
        });
    } catch (error) {
        console.error("POST VotingToken Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal membuat QR Token baru' }, { status: 500 });
    }
}
