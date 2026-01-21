<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { setupKeyboardShortcuts } from "@/lib/keyboardShortcuts";

export default function KeyboardShortcutsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
=======
'use client';

import { useEffect } from 'react';
import { setupKeyboardShortcuts } from '@/lib/keyboardShortcuts';

export default function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  useEffect(() => {
    const cleanup = setupKeyboardShortcuts();
    return cleanup;
  }, []);

  return <>{children}</>;
}
