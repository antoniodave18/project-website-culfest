import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('my-super-secret-key-for-culfest-test');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { candidate, voteToken } = body;

    if (!candidate || !voteToken) {
      return NextResponse.json({ success: false, message: 'Data pilihan atau token vote tidak lengkap.' }, { status: 400 });
    }

    let votePayload;
    try {
      const verified = await jwtVerify(voteToken, SECRET_KEY);
      votePayload = verified.payload;

      if (votePayload.type !== 'vote_ticket') {
        throw new Error('Invalid token type');
      }
    } catch (e: any) {
      return NextResponse.json({ success: false, message: 'Token vote anda sudah kedaluwarsa atau tidak sah.' }, { status: 403 });
    }

    const uniqueVoteId = votePayload.id as string;

    const existingToken = await prisma.usedToken.findUnique({
      where: { token: uniqueVoteId }
    });

    if (existingToken) {
      return NextResponse.json({ success: false, message: 'Maaf, Anda sudah pernah melakukan voting dengan token ini.' }, { status: 403 });
    }

    await prisma.$transaction([
      prisma.usedToken.create({
        data: { token: uniqueVoteId }
      }),
      prisma.vote.create({
        data: { candidate: candidate }
      })
    ]);

    return NextResponse.json({
      success: true,
      message: 'Voting berhasil! Terima kasih atas partisipasi Anda.'
    });

  } catch (error) {
    console.error('Submit vote error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server saat memproses vote.' },
      { status: 500 }
    );
  }
}
