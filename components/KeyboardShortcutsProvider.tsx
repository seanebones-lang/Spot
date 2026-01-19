"use client";

import { useEffect } from "react";
import { setupKeyboardShortcuts } from "@/lib/keyboardShortcuts";

export default function KeyboardShortcutsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const cleanup = setupKeyboardShortcuts();
    return cleanup;
  }, []);

  return <>{children}</>;
}
