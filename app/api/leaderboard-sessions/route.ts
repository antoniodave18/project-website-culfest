import { adminJson, guardAdmin, guardedVotingMutation } from '@/lib/admin-auth';
import { SESSION_CODES } from '@/lib/leaderboard-data';

export async function GET(request: Request) {
  const denied = await guardAdmin(request);
  if (denied) return denied;

  const sessions = SESSION_CODES.map((sessionCode) => ({
    sessionCode,
    enabled: true,
    voteCount: 0,
    createdAt: null,
  }));
  return adminJson({ success: true, data: sessions });
}

export const PUT = guardedVotingMutation;
