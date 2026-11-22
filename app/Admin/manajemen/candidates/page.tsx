import { requireAdminPage } from '@/lib/admin-auth';
import CandidatesClient from './CandidatesClient';

export default async function Page() {
  await requireAdminPage();
  return <CandidatesClient />;
}
