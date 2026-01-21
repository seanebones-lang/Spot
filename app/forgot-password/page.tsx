<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const {
    requestPasswordReset,
    verifyResetCode,
=======
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/stores/userStore';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { 
    requestPasswordReset, 
    verifyResetCode, 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    resetPassword,
    passwordResetStatus,
    resetEmail,
    clearPasswordReset,
<<<<<<< HEAD
    isLoading,
  } = useUserStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
=======
    isLoading 
  } = useUserStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when component unmounts
  useEffect(() => {
    return () => {
<<<<<<< HEAD
      if (passwordResetStatus === "password-reset") {
=======
      if (passwordResetStatus === 'password-reset') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        clearPasswordReset();
      }
    };
  }, [passwordResetStatus, clearPasswordReset]);

  const validateEmail = () => {
    if (!email.trim()) {
<<<<<<< HEAD
      setErrors({ email: "Email is required" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
=======
      setErrors({ email: 'Email is required' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return false;
    }
    return true;
  };

  const validateCode = () => {
    if (!code.trim()) {
<<<<<<< HEAD
      setErrors({ code: "Reset code is required" });
      return false;
    }
    if (!/^\d{6}$/.test(code)) {
      setErrors({ code: "Please enter the 6-digit code" });
=======
      setErrors({ code: 'Reset code is required' });
      return false;
    }
    if (!/^\d{6}$/.test(code)) {
      setErrors({ code: 'Please enter the 6-digit code' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return false;
    }
    return true;
  };

  const validatePasswords = () => {
    const newErrors: Record<string, string> = {};
<<<<<<< HEAD

    if (!newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

=======
    
    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validateEmail()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    const result = await requestPasswordReset(email);

    if (result.success) {
      setSuccessMessage("Reset code sent! Check your email.");
      setStep(2);
    } else {
      setErrors({ general: result.error || "Failed to send reset code" });
    }

=======
    
    if (!validateEmail()) return;
    
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');
    
    const result = await requestPasswordReset(email);
    
    if (result.success) {
      setSuccessMessage('Reset code sent! Check your email.');
      setStep(2);
    } else {
      setErrors({ general: result.error || 'Failed to send reset code' });
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    setIsSubmitting(false);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validateCode()) return;

    setIsSubmitting(true);
    setErrors({});

    const result = await verifyResetCode(email, code);

    if (result.success) {
      setStep(3);
    } else {
      setErrors({ code: result.error || "Invalid reset code" });
    }

=======
    
    if (!validateCode()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    const result = await verifyResetCode(email, code);
    
    if (result.success) {
      setStep(3);
    } else {
      setErrors({ code: result.error || 'Invalid reset code' });
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    setIsSubmitting(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validatePasswords()) return;

    setIsSubmitting(true);
    setErrors({});

    const result = await resetPassword(email, code, newPassword);

    if (result.success) {
      setSuccessMessage(
        "Password reset successfully! Redirecting to sign in...",
      );
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } else {
      setErrors({ general: result.error || "Failed to reset password" });
=======
    
    if (!validatePasswords()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    const result = await resetPassword(email, code, newPassword);
    
    if (result.success) {
      setSuccessMessage('Password reset successfully! Redirecting to sign in...');
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } else {
      setErrors({ general: result.error || 'Failed to reset password' });
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
            <Lock size={32} className="text-spotify-green" />
            <span className="text-2xl font-bold">EmPulse Music</span>
          </Link>
        </div>

        {/* Password Reset Card */}
        <div className="bg-spotify-dark-gray rounded-lg p-8 shadow-2xl">
          {/* Step 1: Request Reset */}
          {step === 1 && (
            <>
<<<<<<< HEAD
              <h1 className="text-3xl font-bold mb-2 text-center">
                Reset your password
              </h1>
=======
              <h1 className="text-3xl font-bold mb-2 text-center">Reset your password</h1>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              <p className="text-spotify-text-gray text-center mb-8">
                Enter your email address and we&apos;ll send you a reset code
              </p>

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
=======
                <div 
                  className="mb-6 p-4 bg-empulse-red/10 border border-empulse-red/50 rounded-lg flex items-start gap-3"
                  role="alert"
                >
                  <AlertCircle size={20} className="text-empulse-red flex-shrink-0 mt-0.5" />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  <p className="text-sm text-empulse-red">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleRequestReset} className="space-y-6">
                <Input
                  type="email"
                  label="Email address"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
<<<<<<< HEAD
                    if (errors.email) setErrors({ ...errors, email: "" });
=======
                    if (errors.email) setErrors({ ...errors, email: '' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                  error={errors.email}
                  iconLeft={Mail}
                  required
                  disabled={isSubmitting || isLoading}
                  autoComplete="email"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting || isLoading}
                  disabled={isSubmitting || isLoading}
                  className="w-full"
                >
                  Send Reset Code
                </Button>
              </form>

              <div className="mt-6 text-center">
<<<<<<< HEAD
                <Link
=======
                <Link 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  href="/signin"
                  className="text-sm text-spotify-green hover:text-spotify-green/80 hover:underline inline-flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to sign in
                </Link>
              </div>
            </>
          )}

          {/* Step 2: Verify Code */}
          {step === 2 && (
            <>
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-spotify-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} className="text-spotify-green" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                <p className="text-spotify-text-gray text-sm mb-2">
                  We sent a 6-digit code to
                </p>
                <p className="text-white font-medium">{email}</p>
              </div>

              {errors.code && (
<<<<<<< HEAD
                <div
=======
                <div 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  className="mb-6 p-4 bg-empulse-red/10 border border-empulse-red/50 rounded-lg"
                  role="alert"
                >
                  <p className="text-sm text-empulse-red">{errors.code}</p>
                </div>
              )}

              <form onSubmit={handleVerifyCode} className="space-y-6">
                <Input
                  type="text"
                  label="Reset code"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => {
<<<<<<< HEAD
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setCode(value);
                    if (errors.code) setErrors({ ...errors, code: "" });
=======
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setCode(value);
                    if (errors.code) setErrors({ ...errors, code: '' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                  error={errors.code}
                  helperText="Enter the 6-digit code from your email"
                  required
                  disabled={isSubmitting || isLoading}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest font-mono"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting || isLoading}
                  disabled={isSubmitting || isLoading}
                  className="w-full"
                >
                  Verify Code
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
<<<<<<< HEAD
                      setCode("");
=======
                      setCode('');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                      setStep(1);
                    }}
                    className="text-sm text-spotify-text-gray hover:text-white transition-colors"
                  >
                    Use a different email
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <>
              <div className="mb-6 text-center">
                <div className="w-16 h-16 bg-spotify-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-spotify-green" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Create new password</h2>
                <p className="text-spotify-text-gray text-sm">
                  Enter your new password below
                </p>
              </div>

              {successMessage && (
<<<<<<< HEAD
                <div
                  className="mb-6 p-4 bg-spotify-green/10 border border-spotify-green/50 rounded-lg flex items-start gap-3"
                  role="alert"
                >
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
=======
                <div 
                  className="mb-6 p-4 bg-spotify-green/10 border border-spotify-green/50 rounded-lg flex items-start gap-3"
                  role="alert"
                >
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  <p className="text-sm text-spotify-green">{successMessage}</p>
                </div>
              )}

              {errors.general && (
<<<<<<< HEAD
                <div
=======
                <div 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  className="mb-6 p-4 bg-empulse-red/10 border border-empulse-red/50 rounded-lg"
                  role="alert"
                >
                  <p className="text-sm text-empulse-red">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-6">
                <Input
<<<<<<< HEAD
                  type={showPassword ? "text" : "password"}
=======
                  type={showPassword ? 'text' : 'password'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  label="New password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
<<<<<<< HEAD
                    if (errors.newPassword)
                      setErrors({ ...errors, newPassword: "" });
=======
                    if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                  error={errors.newPassword}
                  iconLeft={Lock}
                  iconRight={showPassword ? EyeOff : Eye}
                  onIconRightClick={() => setShowPassword(!showPassword)}
                  helperText="Must be at least 8 characters with uppercase, lowercase, and number"
                  required
                  disabled={isSubmitting || isLoading}
                  autoComplete="new-password"
                />

                <Input
<<<<<<< HEAD
                  type={showConfirmPassword ? "text" : "password"}
=======
                  type={showConfirmPassword ? 'text' : 'password'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  label="Confirm new password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
<<<<<<< HEAD
                    if (errors.confirmPassword)
                      setErrors({ ...errors, confirmPassword: "" });
=======
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }}
                  error={errors.confirmPassword}
                  iconLeft={Lock}
                  iconRight={showConfirmPassword ? EyeOff : Eye}
<<<<<<< HEAD
                  onIconRightClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
=======
                  onIconRightClick={() => setShowConfirmPassword(!showConfirmPassword)}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  required
                  disabled={isSubmitting || isLoading}
                  autoComplete="new-password"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting || isLoading}
                  disabled={isSubmitting || isLoading}
                  className="w-full"
                >
                  Reset Password
                </Button>
              </form>
            </>
          )}
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
