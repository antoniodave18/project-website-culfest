/** @param {import('@prisma/client').Prisma.TransactionClient} tx
 * @param {{id:string,name:string,slug:string}} community */
export async function provision(tx, community) {
  const { id: communityId, name, slug } = community;
  const existing = await tx.organization.findUnique({ where: { communityId } });
  if (existing && (existing.slug !== slug || existing.name !== name)) throw new Error('Workspace identity mismatch');
  const org = existing ?? await tx.organization.create({ data: { communityId, name, slug } });
  const admins = await tx.user.findMany({ where: { role: 'PLATFORM_ADMIN' }, select: { id: true } });
  await tx.member.createMany({
    data: admins.map(user => ({ organizationId: org.id, userId: user.id, role: 'admin', platformBootstrap: true })),
    skipDuplicates: true,
  });
}
