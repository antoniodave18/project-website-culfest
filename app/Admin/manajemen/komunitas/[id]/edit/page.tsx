import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/admin-auth';
import { isCommunityId } from '@/lib/communities';
import prisma from '@/lib/prisma';
import CommunityForm from '../../CommunityForm';

export default async function EditCommunityPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();
  const { id } = await params;
  if (!isCommunityId(id)) notFound();
  const community = await prisma.community.findUnique({ where: { id } });
  if (!community) notFound();

  return <CommunityForm community={community} />;
}
