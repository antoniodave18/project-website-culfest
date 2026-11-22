import { guardAdmin } from '@/lib/admin-auth';
import { issueEmailChallenge } from '@/lib/email-challenges';
import { workspaceRequest } from '@/lib/workspace-request';

export async function POST(request: Request) {
  return await guardAdmin(request) ?? workspaceRequest(request, issueEmailChallenge);
}
