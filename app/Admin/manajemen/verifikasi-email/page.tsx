import { requireAdminPage } from '@/lib/admin-auth';
import ActionForm from '@/app/Community/ActionForm';
import '../komunitas/communities.css';

export default async function VerificationPage() {
  await requireAdminPage();
  return <section className="community-admin"><h1>Verifikasi email akun</h1>
    <p>Kirim tautan hanya ke alamat email akun yang dimasukkan. Penerima harus masuk dan mengonfirmasi dalam 15 menit.</p>
    <ActionForm endpoint="/api/admin/email-verification" label="Buat tautan verifikasi">
      <label>Email akun<input name="email" type="email" required maxLength={191} /></label>
    </ActionForm></section>;
}
