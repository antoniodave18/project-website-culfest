import { acceptInvitation } from '@/lib/workspaces';
import { workspaceRequest } from '@/lib/workspace-request';

export function POST(request: Request) {
  return workspaceRequest(request, acceptInvitation);
}
