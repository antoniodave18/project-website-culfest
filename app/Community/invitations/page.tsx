import { headers } from 'next/headers';
import { adminSession } from '@/lib/admin-auth';
import Recipient from '../Recipient';

export default async function InvitationPage() {
  return <><h1>Undangan komunitas</h1><Recipient verification={false} signedIn={!!await adminSession(await headers())} /></>;
}
