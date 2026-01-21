<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Music } from "lucide-react";
import { cn } from "@/lib/utils";
=======
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/stores/userStore';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function SignInPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useUserStore();
<<<<<<< HEAD

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
=======
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
<<<<<<< HEAD
      router.push("/");
=======
      router.push('/');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }
  }, [isAuthenticated, router]);

  const validate = () => {
    const newErrors: typeof errors = {};
<<<<<<< HEAD

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

=======
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const result = await login(email, password);

    if (result.success) {
      router.push("/");
    } else {
      setErrors({ general: result.error || "Invalid email or password" });
=======
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    const result = await login(email, password);
    
    if (result.success) {
      router.push('/');
    } else {
      setErrors({ general: result.error || 'Invalid email or password' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
<<<<<<< HEAD
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-spotify-green transition-colors"
          >
=======
          <Link href="/" className="flex items-center gap-2 text-white hover:text-spotify-green transition-colors">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            <Music size={32} className="text-spotify-green" />
            <span className="text-2xl font-bold">EmPulse Music</span>
          </Link>
        </div>

        {/* Sign In Card */}
        <div className="bg-spotify-dark-gray rounded-lg p-8 shadow-2xl">
<<<<<<< HEAD
          <h1 className="text-3xl font-bold mb-2 text-center">
            Sign in to your account
          </h1>
=======
          <h1 className="text-3xl font-bold mb-2 text-center">Sign in to your account</h1>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <p className="text-spotify-text-gray text-center mb-8">
            Welcome back! Please enter your details.
          </p>

          {/* General Error */}
          {errors.general && (
<<<<<<< HEAD
            <div
              className="mb-6 p-4 bg-empulse-red/10 border border-empulse-red/50 rounded-lg flex items-start gap-3"
              role="alert"
            >
              <AlertCircle
                size={20}
                className="text-empulse-red flex-shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <p className="text-sm text-empulse-red font-medium">
                  Sign in failed
                </p>
                <p className="text-xs text-empulse-red/80 mt-1">
                  {errors.general}
                </p>
=======
            <div 
              className="mb-6 p-4 bg-empulse-red/10 border border-empulse-red/50 rounded-lg flex items-start gap-3"
              role="alert"
            >
              <AlertCircle size={20} className="text-empulse-red flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-empulse-red font-medium">Sign in failed</p>
                <p className="text-xs text-empulse-red/80 mt-1">{errors.general}</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <Input
              type="email"
              label="Email address"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              error={errors.email}
              iconLeft={Mail}
              required
              disabled={isSubmitting}
              autoComplete="email"
            />

            {/* Password */}
            <div>
              <Input
<<<<<<< HEAD
                type={showPassword ? "text" : "password"}
=======
                type={showPassword ? 'text' : 'password'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
<<<<<<< HEAD
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
=======
                  if (errors.password) setErrors({ ...errors, password: undefined });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
                error={errors.password}
                iconLeft={Lock}
                iconRight={showPassword ? EyeOff : Eye}
                onIconRightClick={() => setShowPassword(!showPassword)}
                required
                disabled={isSubmitting}
                autoComplete="current-password"
              />
<<<<<<< HEAD

              {/* Forgot Password Link */}
              <div className="mt-2 text-right">
                <Link
=======
              
              {/* Forgot Password Link */}
              <div className="mt-2 text-right">
                <Link 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  href="/forgot-password"
                  className="text-sm text-spotify-green hover:text-spotify-green/80 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting || isLoading}
              disabled={isSubmitting || isLoading}
              className="w-full"
            >
              Sign in
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-spotify-dark-gray text-spotify-text-gray">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign In */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
<<<<<<< HEAD
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
=======
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              </svg>
              Continue with GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-spotify-text-gray text-sm">
<<<<<<< HEAD
              Don&apos;t have an account?{" "}
              <Link
=======
              Don&apos;t have an account?{' '}
              <Link 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                href="/signup"
                className="text-spotify-green hover:text-spotify-green/80 hover:underline font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-spotify-text-gray">
          <div className="flex justify-center gap-6">
<<<<<<< HEAD
            <Link
              href="/legal/privacy"
              className="hover:text-white hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-white hover:underline transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/help"
              className="hover:text-white hover:underline transition-colors"
            >
=======
            <Link href="/legal/privacy" className="hover:text-white hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-white hover:underline transition-colors">
              Terms of Service
            </Link>
            <Link href="/help" className="hover:text-white hover:underline transition-colors">
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
