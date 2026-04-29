import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: candidates });
  } catch (error) {
    console.error("GET Candidates Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kandidat" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, imageBase64 } = body;

    if (!name || !imageBase64) {
      return NextResponse.json(
        { success: false, message: "Nama dan gambar wajib diisi" },
        { status: 400 },
      );
    }

    // Proses Base64
    // Base64 format e.g. "data:image/png;base64,iVBORw0KGgo..."
    const matches = imageBase64.match(
      /^data:image\/([A-Za-z-+\/]+);base64,(.+)$/,
    );

    let ext = "png";
    let buffer: Buffer;

    if (matches && matches.length === 3) {
      ext = matches[1];
      buffer = Buffer.from(matches[2], "base64");
    } else {
      // Coba parsing seadanya jika tanpa prefix
      buffer = Buffer.from(imageBase64, "base64");
    }

    const fileName = `candidate-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "candidates",
    );
    const filePath = path.join(uploadDir, fileName);
    let imageUrl = `data:image/${ext};base64,${matches ? matches[2] : imageBase64}`;

    // Simpan ke filesystem jika tersedia, tetapi jangan gagal total bila environment tidak persistent.
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
      fs.writeFileSync(filePath, buffer);
      imageUrl = `/uploads/candidates/${fileName}`;
    } catch (fsError) {
      console.warn("File write skipped, using data URL fallback:", fsError);
    }

    const newCandidate = await prisma.candidate.create({
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, data: newCandidate });
  } catch (error) {
    console.error("POST Candidate Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan kandidat" },
      { status: 500 },
    );
  }
}
