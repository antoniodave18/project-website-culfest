import { requireAdminPage } from '@/lib/admin-auth';
import AdminWorkspace from './AdminWorkspace';
import './workspace.css';

export default async function ManagementLayout({ children }: { children: React.ReactNode }) {
  const administrator = await requireAdminPage();
  return <AdminWorkspace administrator={administrator}>{children}</AdminWorkspace>;
}
