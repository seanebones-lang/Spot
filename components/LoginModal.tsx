<<<<<<< HEAD
"use client";

import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import Button from "./Button";
import { useAuthStore } from "@/stores/authStore";
=======
'use client';

import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import Button from './Button';
import { useAuthStore } from '@/stores/authStore';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
<<<<<<< HEAD
  defaultMode?: "login" | "register";
}

export default function LoginModal({
  isOpen,
  onClose,
  defaultMode = "login",
}: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
=======
  defaultMode?: 'login' | 'register';
}

export default function LoginModal({ isOpen, onClose, defaultMode = 'login' }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuthStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
<<<<<<< HEAD
      if (mode === "login") {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError("Name is required");
=======
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError('Name is required');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          setIsLoading(false);
          return;
        }
        await register(email, password, name);
      }
      onClose();
      // Reset form
<<<<<<< HEAD
      setEmail("");
      setPassword("");
      setName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
=======
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-spotify-light-gray rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#181818",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "448px",
          width: "100%",
=======
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-spotify-light-gray rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#181818',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '448px',
          width: '100%'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
<<<<<<< HEAD
            {mode === "login" ? "Sign In" : "Create Account"}
=======
            {mode === 'login' ? 'Sign In' : 'Create Account'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </h2>
          <button
            onClick={onClose}
            className="text-spotify-text-gray hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
<<<<<<< HEAD
          {mode === "register" && (
=======
          {mode === 'register' && (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Name
              </label>
              <div className="relative">
<<<<<<< HEAD
                <User
=======
                <User 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-text-gray"
                  size={20}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-spotify-dark-gray text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Email
            </label>
            <div className="relative">
<<<<<<< HEAD
              <Mail
=======
              <Mail 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-text-gray"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-spotify-dark-gray text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-spotify-green"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Password
            </label>
            <div className="relative">
<<<<<<< HEAD
              <Lock
=======
              <Lock 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-text-gray"
                size={20}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-spotify-dark-gray text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-spotify-green"
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>
<<<<<<< HEAD
            {mode === "register" && (
=======
            {mode === 'register' && (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              <p className="text-xs text-spotify-text-gray mt-1">
                Must be at least 8 characters
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
<<<<<<< HEAD
            {mode === "login" ? "Sign In" : "Create Account"}
=======
            {mode === 'login' ? 'Sign In' : 'Create Account'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
<<<<<<< HEAD
              setMode(mode === "login" ? "register" : "login");
=======
              setMode(mode === 'login' ? 'register' : 'login');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              setError(null);
            }}
            className="text-spotify-green hover:underline text-sm"
          >
<<<<<<< HEAD
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
=======
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </button>
        </div>
      </div>
    </div>
  );
}
