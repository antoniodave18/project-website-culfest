import { redeemEmailChallenge } from '@/lib/email-challenges';
import { workspaceRequest } from '@/lib/workspace-request';

export function POST(request: Request) {
  return workspaceRequest(request, redeemEmailChallenge);
}
