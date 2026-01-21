<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";
import Button from "@/components/Button";
import { CheckCircle, Clock, XCircle, AlertCircle, Music } from "lucide-react";
=======
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/stores/userStore';
import Button from '@/components/Button';
import { CheckCircle, Clock, XCircle, AlertCircle, Music } from 'lucide-react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function ArtistVerificationPendingPage() {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    // Redirect if no artist application
    if (!user || !user.artistApplication) {
<<<<<<< HEAD
      router.push("/");
=======
      router.push('/');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }
  }, [user, router]);

  if (!user || !user.artistApplication) {
    return null;
  }

  const { approvalStatus } = user.artistApplication;

  const getStatusContent = () => {
    switch (approvalStatus) {
<<<<<<< HEAD
      case "pending":
        return {
          icon: Clock,
          iconColor: "text-yellow-500",
          bgColor: "bg-yellow-500/20",
          title: "Application Pending Review",
          message:
            "Your artist/management application has been submitted and is awaiting admin review.",
          details:
            "This typically takes 24-48 hours. You&apos;ll receive an email notification once your application has been reviewed.",
        };
      case "under-review":
        return {
          icon: AlertCircle,
          iconColor: "text-blue-500",
          bgColor: "bg-blue-500/20",
          title: "Under Review",
          message: "Your application is currently being reviewed by our team.",
          details:
            "We&apos;re carefully reviewing your submission. You&apos;ll be notified as soon as a decision is made.",
        };
      case "approved":
        return {
          icon: CheckCircle,
          iconColor: "text-spotify-green",
          bgColor: "bg-spotify-green/20",
          title: "Approved!",
          message:
            "Congratulations! Your artist/management application has been approved.",
          details:
            "You can now upgrade your account to access artist features, or continue using free/premium without artist access.",
        };
      case "rejected":
        return {
          icon: XCircle,
          iconColor: "text-empulse-red",
          bgColor: "bg-empulse-red/20",
          title: "Application Rejected",
          message: "Your application was not approved at this time.",
          details:
            user.artistApplication?.rejectionReason ||
            "Please review the requirements and resubmit with additional documentation if needed.",
=======
      case 'pending':
        return {
          icon: Clock,
          iconColor: 'text-yellow-500',
          bgColor: 'bg-yellow-500/20',
          title: 'Application Pending Review',
          message: 'Your artist/management application has been submitted and is awaiting admin review.',
          details: 'This typically takes 24-48 hours. You&apos;ll receive an email notification once your application has been reviewed.',
        };
      case 'under-review':
        return {
          icon: AlertCircle,
          iconColor: 'text-blue-500',
          bgColor: 'bg-blue-500/20',
          title: 'Under Review',
          message: 'Your application is currently being reviewed by our team.',
          details: 'We&apos;re carefully reviewing your submission. You&apos;ll be notified as soon as a decision is made.',
        };
      case 'approved':
        return {
          icon: CheckCircle,
          iconColor: 'text-spotify-green',
          bgColor: 'bg-spotify-green/20',
          title: 'Approved!',
          message: 'Congratulations! Your artist/management application has been approved.',
          details: 'You can now upgrade your account to access artist features, or continue using free/premium without artist access.',
        };
      case 'rejected':
        return {
          icon: XCircle,
          iconColor: 'text-empulse-red',
          bgColor: 'bg-empulse-red/20',
          title: 'Application Rejected',
          message: 'Your application was not approved at this time.',
          details: user.artistApplication?.rejectionReason || 'Please review the requirements and resubmit with additional documentation if needed.',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        };
      default:
        return null;
    }
  };

  const statusContent = getStatusContent();
  if (!statusContent) return null;

  const StatusIcon = statusContent.icon;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Status Card */}
        <div className="bg-spotify-dark-gray rounded-lg p-12 text-center shadow-2xl">
          {/* Icon */}
<<<<<<< HEAD
          <div
            className={`w-24 h-24 ${statusContent.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
          >
=======
          <div className={`w-24 h-24 ${statusContent.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            <StatusIcon size={48} className={statusContent.iconColor} />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">{statusContent.title}</h1>

          {/* Message */}
          <p className="text-lg text-spotify-text-gray mb-6 max-w-md mx-auto">
            {statusContent.message}
          </p>

          {/* Details */}
          <div className="bg-spotify-light-gray rounded-lg p-6 mb-8 max-w-lg mx-auto">
<<<<<<< HEAD
            <p className="text-sm text-white/80">{statusContent.details}</p>
=======
            <p className="text-sm text-white/80">
              {statusContent.details}
            </p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </div>

          {/* Actions */}
          <div className="space-y-4">
<<<<<<< HEAD
            {approvalStatus === "approved" && (
=======
            {approvalStatus === 'approved' && (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              <>
                <Button
                  variant="primary"
                  size="lg"
<<<<<<< HEAD
                  onClick={() => router.push("/subscription?upgrade=artist")}
=======
                  onClick={() => router.push('/subscription?upgrade=artist')}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  className="w-full max-w-md mx-auto"
                >
                  Upgrade to Artist Account
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
<<<<<<< HEAD
                  onClick={() => router.push("/")}
=======
                  onClick={() => router.push('/')}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  className="w-full max-w-md mx-auto"
                >
                  Continue with Free/Premium Account
                </Button>
              </>
            )}

<<<<<<< HEAD
            {approvalStatus === "rejected" && (
=======
            {approvalStatus === 'rejected' && (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              <>
                <Button
                  variant="primary"
                  size="lg"
<<<<<<< HEAD
                  onClick={() => router.push("/artist/verification")}
=======
                  onClick={() => router.push('/artist/verification')}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  className="w-full max-w-md mx-auto"
                >
                  Resubmit Application
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
<<<<<<< HEAD
                  onClick={() => router.push("/")}
=======
                  onClick={() => router.push('/')}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  className="w-full max-w-md mx-auto"
                >
                  Go to Home
                </Button>
              </>
            )}

<<<<<<< HEAD
            {(approvalStatus === "pending" ||
              approvalStatus === "under-review") && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/")}
=======
            {(approvalStatus === 'pending' || approvalStatus === 'under-review') && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/')}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                className="w-full max-w-md mx-auto"
              >
                Go to Home
              </Button>
            )}
          </div>

          {/* Help Link */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-spotify-text-gray mb-2">
              Need help with your application?
            </p>
            <Link
              href="/support"
              className="text-spotify-green hover:text-spotify-green/80 hover:underline text-sm transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
