import type { Metadata } from 'next';
import '../Admin/manajemen/komunitas/communities.css';
import './portal.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { referrer: 'no-referrer', robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="community-portal"><div className="community-admin">{children}</div></main>;
}
