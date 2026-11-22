import { requireAdminPage } from '@/lib/admin-auth';
import QRGeneratorClient from './QRGeneratorClient';

export default async function Page() {
  await requireAdminPage();
  return <QRGeneratorClient />;
}
