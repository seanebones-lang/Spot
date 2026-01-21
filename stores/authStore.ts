<<<<<<< HEAD
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSafeStorage } from "@/lib/safeStorage";
=======
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSafeStorage } from '@/lib/safeStorage';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
<<<<<<< HEAD
  role: "user" | "artist" | "admin";
=======
  role: 'user' | 'artist' | 'admin';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  artistApproved?: boolean;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

<<<<<<< HEAD
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
=======
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      setToken: (token) => set({ token }),

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
<<<<<<< HEAD
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const endpoint = apiUrl
            ? `${apiUrl}/api/auth/login`
            : "/api/auth/login";
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
=======
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
          const endpoint = apiUrl ? `${apiUrl}/api/auth/login` : '/api/auth/login';
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
<<<<<<< HEAD
            throw new Error(error.error || "Login failed");
=======
            throw new Error(error.error || 'Login failed');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }

          const data = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        try {
<<<<<<< HEAD
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
=======
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            body: JSON.stringify({ email, password, name }),
          });

          if (!response.ok) {
            const error = await response.json();
<<<<<<< HEAD
            throw new Error(error.error || "Registration failed");
=======
            throw new Error(error.error || 'Registration failed');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }

          const data = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        try {
<<<<<<< HEAD
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
          const endpoint = apiUrl ? `${apiUrl}/api/auth/me` : "/api/auth/me";
          const response = await fetch(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
=======
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
          const endpoint = apiUrl ? `${apiUrl}/api/auth/me` : '/api/auth/me';
          const response = await fetch(endpoint, {
            headers: {
              'Authorization': `Bearer ${token}`,
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            },
          });

          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              isAuthenticated: true,
            });
          } else {
            // Token invalid, logout
            get().logout();
          }
        } catch (error) {
<<<<<<< HEAD
          console.error("Auth check failed:", error);
=======
          console.error('Auth check failed:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          get().logout();
        }
      },
    }),
    {
<<<<<<< HEAD
      name: "auth-storage",
=======
      name: 'auth-storage',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      storage: createJSONStorage(() => {
        try {
          return createSafeStorage();
        } catch (error) {
<<<<<<< HEAD
          console.error("Failed to create storage:", error);
=======
          console.error('Failed to create storage:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          return sessionStorage;
        }
      }),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
<<<<<<< HEAD
    },
  ),
=======
    }
  )
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
);
