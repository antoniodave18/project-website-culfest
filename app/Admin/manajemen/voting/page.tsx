import { requireAdminPage } from '@/lib/admin-auth';
import CandidateFormClient from './CandidateFormClient';

export default async function Page() {
  await requireAdminPage();
  return <CandidateFormClient />;
}
