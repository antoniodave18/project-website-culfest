import { guardedVotingMutation, votingDisabled } from '@/lib/admin-auth';

export const POST = votingDisabled;
export const DELETE = guardedVotingMutation;
