<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
=======
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useUserStore();

  useEffect(() => {
    logout();
<<<<<<< HEAD
    router.push("/");
=======
    router.push('/');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }, [logout, router]);

  return null;
}
