import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15+ App router, params is a promise
) {
    try {
        const routeParams = await params;
        const candidateId = routeParams.id;

        // Cari kandidat untuk mendapatkan path gambarnya
        const candidate = await prisma.candidate.findUnique({
            where: { id: candidateId }
        });

        if (!candidate) {
            return NextResponse.json({ success: false, message: 'Kandidat tidak ditemukan' }, { status: 404 });
        }

        // Hapus file fisiknya jika ada
        if (candidate.imageUrl) {
            const fileName = path.basename(candidate.imageUrl);
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'candidates');
            const filePath = path.join(uploadDir, fileName);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Hapus juga secara otomatis data votes terkait berkat relasi DB (atau manual mendelete kalau cascade tidak aktif)
        // Di SQLite Prisma by default restrict kalau tak ada cascade.
        await prisma.vote.deleteMany({
            where: { candidateId }
        });

        await prisma.candidate.delete({
            where: { id: candidateId }
        });

        return NextResponse.json({ success: true, message: 'Kandidat berhasil dihapus' });
    } catch (error) {
        console.error("DELETE Candidate Error:", error);
        return NextResponse.json({ success: false, message: 'Gagal menghapus kandidat' }, { status: 500 });
    }
}
