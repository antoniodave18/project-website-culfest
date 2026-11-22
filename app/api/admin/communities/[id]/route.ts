import { adminJson } from '@/lib/admin-auth';
import { communityBody, communityRequest } from '@/lib/community-api';
import { CommunityError, updateCommunity } from '@/lib/communities';
import prisma from '@/lib/prisma';

type Context = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Context) {
  const { id } = await params;
  return communityRequest(request, async () => {
    const data = await prisma.community.findUnique({ where: { id } });
    if (!data) throw new CommunityError('Komunitas tidak ditemukan.', 404);
    return adminJson({ success: true, data });
  }, id);
}

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  return communityRequest(request, async () => {
    const data = await updateCommunity(id, await communityBody(request));
    return adminJson({ success: true, data });
  }, id);
}
