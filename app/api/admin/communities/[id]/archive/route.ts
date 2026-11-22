import { adminJson } from '@/lib/admin-auth';
import { communityRequest } from '@/lib/community-api';
import { archiveCommunity } from '@/lib/communities';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return communityRequest(request, async actor => {
    await archiveCommunity(id, actor);
    return adminJson({ success: true });
  }, id);
}
