import { headers } from 'next/headers';
import { adminSession } from '@/lib/admin-auth';
import Recipient from '../Recipient';

export default async function VerifyPage() {
  return <><h1>Verifikasi email</h1><Recipient verification signedIn={!!await adminSession(await headers())} /></>;
}
