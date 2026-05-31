import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  _params: { params: Promise<{ id: string }> }, // In Next.js 15+ App router, params is a promise
) {
  try {
    return NextResponse.json(
      { success: false, message: "Voting sedang dinonaktifkan." },
      { status: 403 },
    );
  } catch (error) {
    console.error("DELETE Candidate Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus kandidat" },
      { status: 500 },
    );
  }
}
