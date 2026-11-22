import { requireAdminPage } from '@/lib/admin-auth';
import AdminLogoutButton from '../AdminLogoutButton';

export default async function ManagementLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPage();
  return (
    <>
      <div className="flex justify-end bg-[#5c0a00] p-3 text-white"><AdminLogoutButton /></div>
      {children}
    </>
  );
}
