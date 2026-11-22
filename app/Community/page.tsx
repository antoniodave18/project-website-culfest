import Link from 'next/link';
import { headers } from 'next/headers';
import { adminSession } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';
import Login from './Login';
import ActionForm from './ActionForm';

export default async function Portal() {
  const session = await adminSession(await headers());
  if (!session) return <><h1>Masuk ke portal komunitas</h1><Login /></>;
  const communities = await prisma.community.findMany({
    where: session.user.role === 'PLATFORM_ADMIN' ? { organization: { isNot: null } } : {
      publicationStatus: { not: 'ARCHIVED' }, organization: { members: { some: { userId: session.user.id, platformBootstrap: false } } },
    }, select: { slug: true, name: true }, orderBy: { name: 'asc' },
  });
  return <><div className="community-heading"><h1>Portal komunitas</h1><ActionForm endpoint="/api/auth/sign-out" label="Keluar" /></div>
    {communities.length ? <ul>{communities.map(c => <li key={c.slug}><Link href={'/Community/workspaces/' + c.slug}>{c.name}</Link></li>)}</ul>
      : <p>Anda belum menjadi anggota komunitas.</p>}</>;
}
