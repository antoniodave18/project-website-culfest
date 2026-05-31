import { NextResponse } from "next/server";
import { LEADERBOARD_DATA } from "@/lib/leaderboard-data";

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: LEADERBOARD_DATA });
  } catch (error) {
    console.error("GET Candidates Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data kandidat" },
      { status: 500 },
    );
  }
}

export async function POST(_request: Request) {
  try {
    return NextResponse.json(
      { success: false, message: "Voting sedang dinonaktifkan." },
      { status: 403 },
    );
  } catch (error) {
    console.error("POST Candidate Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan kandidat" },
      { status: 500 },
    );
  }
}
