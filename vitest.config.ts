<<<<<<< HEAD
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
=======
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default defineConfig({
  plugins: [react()],
  test: {
<<<<<<< HEAD
    environment: "jsdom",
    globals: true,
    setupFiles: ["./__tests__/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "__tests__/",
        "**/*.config.*",
        "**/types/**",
        "**/*.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
=======
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '**/*.config.*',
        '**/types/**',
        '**/*.d.ts',
        '**/__tests__/**',
        '**/e2e/**',
      ],
    },
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.next', 'e2e'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    },
  },
});
