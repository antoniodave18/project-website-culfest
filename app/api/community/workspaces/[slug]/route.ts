import { changeWorkspace } from '@/lib/workspaces';
import { workspaceRequest } from '@/lib/workspace-request';

export async function POST(request: Request, { params }: { params: Promise<{slug: string}> }) {
  const { slug } = await params;
  return workspaceRequest(request, (id, body) => changeWorkspace(id, slug, body));
}
