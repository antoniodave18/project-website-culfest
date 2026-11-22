import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminHome, adminSession } from '@/lib/admin-auth';
import AdminLoginForm from './AdminLoginForm';
import AdminLogoutButton from './AdminLogoutButton';

export default async function AdminPage() {
  const session = await adminSession(await headers());
  if (session?.user.role === 'PLATFORM_ADMIN') redirect(adminHome);
  if (session) {
    return (
      <main className="min-h-screen bg-[#5c0a00] text-white grid place-content-center gap-4 p-4">
        <h1 className="text-xl font-semibold">Akses admin ditolak</h1>
        <AdminLogoutButton />
      </main>
    );
  }
  return <AdminLoginForm />;
}
