import { adminJson } from '@/lib/admin-auth';

export function POST() {
  return adminJson({ success: false, message: 'Gunakan halaman masuk admin.' }, 410);
}
