'use client';
import { useRouter } from 'next/navigation';
import ActionForm from './ActionForm';

export default function Login({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  return <ActionForm endpoint="/api/auth/sign-in/email" label="Masuk" onSuccess={onSuccess ?? (() => router.refresh())}>
    <label>Email<input name="email" type="email" required autoComplete="username" /></label>
    <label>Kata sandi<input name="password" type="password" required autoComplete="current-password" /></label>
  </ActionForm>;
}
