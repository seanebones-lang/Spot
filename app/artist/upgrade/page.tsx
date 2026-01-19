"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import Button from "@/components/Button";
import { Check, X, Music, Crown, AlertCircle } from "lucide-react";

export default function ArtistUpgradePage() {
  const router = useRouter();
  const { user, updateSubscriptionTier } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Redirect if not approved
    const artistApp = user?.artistApplication;
    if (!artistApp || artistApp.approvalStatus !== "approved") {
      router.push("/artist/verification/pending");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const artistApplication = user.artistApplication;
  if (!artistApplication || artistApplication.approvalStatus !== "approved") {
    return null;
  }

  const handleUpgrade = async () => {
    setIsProcessing(true);

    // Update subscription tier to artist
    updateSubscriptionTier("artist");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsProcessing(false);
    router.push("/dashboard/artist");
  };

  const handleStayFree = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-spotify-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown size={40} className="text-spotify-green" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Upgrade to Artist Account</h1>
          <p className="text-spotify-text-gray text-lg max-w-2xl mx-auto">
            Your artist application has been approved! Upgrade now to access
            exclusive artist features, or continue using your current plan
            without artist features.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Current Plan */}
          <div className="bg-spotify-dark-gray rounded-lg p-8 border-2 border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Current Plan</h2>
              <span className="px-3 py-1 bg-spotify-light-gray rounded-full text-sm font-medium capitalize">
                {user.subscriptionTier}
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-spotify-text-gray">
                  Access to music library
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-spotify-text-gray">
                  Playlists and collections
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-spotify-text-gray">Social features</span>
              </div>
              <div className="flex items-start gap-3">
                <X
                  size={20}
                  className="text-empulse-red flex-shrink-0 mt-0.5"
                />
                <span className="text-spotify-text-gray line-through">
                  Upload tracks
                </span>
              </div>
              <div className="flex items-start gap-3">
                <X
                  size={20}
                  className="text-empulse-red flex-shrink-0 mt-0.5"
                />
                <span className="text-spotify-text-gray line-through">
                  Artist dashboard
                </span>
              </div>
              <div className="flex items-start gap-3">
                <X
                  size={20}
                  className="text-empulse-red flex-shrink-0 mt-0.5"
                />
                <span className="text-spotify-text-gray line-through">
                  Analytics & insights
                </span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleStayFree}
              className="w-full"
            >
              Continue with Current Plan
            </Button>
          </div>

          {/* Artist Plan */}
          <div className="bg-spotify-dark-gray rounded-lg p-8 border-2 border-spotify-green relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 bg-spotify-green text-black rounded-full text-sm font-bold">
                Recommended
              </span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Artist Account</h2>
              <Crown size={24} className="text-spotify-green" />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-white font-medium">
                  Everything in {user.subscriptionTier} plan
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-white font-medium">
                  Upload unlimited tracks
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-white font-medium">
                  Full artist dashboard
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-white font-medium">
                  Advanced analytics & insights
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-white font-medium">
                  Fan engagement tools
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-white font-medium">
                  Revenue tracking & payouts
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-spotify-green flex-shrink-0 mt-0.5"
                />
                <span className="text-white font-medium">
                  Collaboration features
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleUpgrade}
              loading={isProcessing}
              disabled={isProcessing}
              className="w-full"
            >
              Upgrade to Artist Account
            </Button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-spotify-dark-gray rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertCircle
              size={24}
              className="text-spotify-green flex-shrink-0 mt-0.5"
            />
            <div>
              <h3 className="font-bold text-white mb-2">
                Your Approval Status
              </h3>
              <p className="text-sm text-spotify-text-gray mb-4">
                Your artist/management application has been approved. You can
                upgrade to an Artist account at any time to access all artist
                features. Your current {user.subscriptionTier} plan will remain
                active if you choose not to upgrade now.
              </p>
              <div className="flex flex-wrap gap-2">
                {artistApplication.types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm capitalize"
                  >
                    {type}
                  </span>
                ))}
                {artistApplication.isManagement && (
                  <span className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm">
                    Management
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
