import { adminJson } from '@/lib/admin-auth';
import { communityBody, communityRequest } from '@/lib/community-api';
import { communityFilters, createCommunity, listCommunities } from '@/lib/communities';

export async function GET(request: Request) {
  return communityRequest(request, async () => {
    const data = await listCommunities(communityFilters(new URL(request.url).searchParams));
    return adminJson({ success: true, data });
  });
}

export async function POST(request: Request) {
  return communityRequest(request, async () => {
    const data = await createCommunity(await communityBody(request));
    return adminJson({ success: true, data }, 201);
  });
}
