import { guardedVotingMutation, votingDisabled } from '@/lib/admin-auth';

export const GET = votingDisabled;
export const POST = guardedVotingMutation;
