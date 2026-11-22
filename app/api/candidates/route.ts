import { guardedVotingMutation } from '@/lib/admin-auth';
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

export const POST = guardedVotingMutation;
