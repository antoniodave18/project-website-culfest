import { requireAdminPage } from '@/lib/admin-auth';
import CommunityForm from '../CommunityForm';

export default async function NewCommunityPage() {
  await requireAdminPage();
  return <CommunityForm />;
}
