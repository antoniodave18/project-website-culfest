import { requireAdminPage } from '@/lib/admin-auth';
import LeaderboardControlClient from './LeaderboardControlClient';

export default async function Page() {
  await requireAdminPage();
  return <LeaderboardControlClient />;
}
