import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rawCounts = await prisma.vote.groupBy({
      by: ['candidate'],
      _count: {
        candidate: true
      }
    });

    // Map into a simpler dictionary
    const results: Record<string, number> = {};
    rawCounts.forEach(item => {
      results[item.candidate] = item._count.candidate;
    });

    // Kita asumsikan default 0 untuk kandidat agar tetap muncul
    // Meskipun belum ada yang nge-vote mereka
    const formattedData = {
      wayang: results['wayang'] || 0,
      gatotkaca: results['gatotkaca'] || 0,
      srikandi: results['srikandi'] || 0,
    };

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error) {
    console.error('Fetch vote results error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal memuat hasil voting.' },
      { status: 500 }
    );
  }
}
