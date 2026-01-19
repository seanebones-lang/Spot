'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useUserStore();

  useEffect(() => {
    logout();
    router.push('/');
  }, [logout, router]);

  return null;
}
