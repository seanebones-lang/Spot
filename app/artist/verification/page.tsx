"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  Upload,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  Music,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArtistVerificationPage() {
  const router = useRouter();
  const { user, submitArtistApplication, isLoading } = useUserStore();

  const [proofFiles, setProofFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    // Redirect if no artist application pending
    if (
      !user ||
      !user.artistApplication ||
      user.artistApplication.approvalStatus !== "pending"
    ) {
      router.push("/");
    }
  }, [user, router]);

  if (!user || !user.artistApplication) {
    return null;
  }

  const { types, isManagement } = user.artistApplication;

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter((file) => {
      // Validate file type (images, PDFs)
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors({
          files: `${file.name} is not a valid file type. Please upload images or PDFs.`,
        });
        return false;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({
          files: `${file.name} is too large. Maximum file size is 10MB.`,
        });
        return false;
      }
      return true;
    });

    setProofFiles((prev) => [...prev, ...newFiles]);
    setErrors({});
  };

  const removeFile = (index: number) => {
    setProofFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (proofFiles.length === 0) {
      setErrors({ files: "Please upload at least one proof document" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Submit application with proof files
    submitArtistApplication(types, isManagement, proofFiles);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);

    // Show success and redirect
    router.push("/artist/verification/pending");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Artist Verification</h1>
          <p className="text-spotify-text-gray">
            Submit proof of your artist/management status for approval
          </p>
        </div>

        {/* Application Info */}
        <div className="bg-spotify-dark-gray rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Your Application</h2>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-spotify-text-gray mb-1">
                Account Type
              </div>
              <div className="flex flex-wrap gap-2">
                {isManagement && (
                  <span className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm">
                    Management/Label
                  </span>
                )}
                {types.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-spotify-text-gray mb-1">Email</div>
              <div className="text-white">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-spotify-dark-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2">Upload Proof Documents</h2>
          <p className="text-spotify-text-gray mb-6">
            Please upload documents that prove your artist or management status.
            This could include:
          </p>

          <ul className="list-disc list-inside text-spotify-text-gray mb-8 space-y-2 ml-4">
            <li>
              Music releases on streaming platforms (screenshots or links)
            </li>
            <li>Artist profiles on music platforms</li>
            <li>Management contracts or agreements</li>
            <li>Label registration documents</li>
            <li>Music industry credentials</li>
            <li>Social media profiles with significant following</li>
          </ul>

          {/* File Upload Area */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center transition-all",
                dragActive
                  ? "border-spotify-green bg-spotify-green/10"
                  : "border-spotify-light-gray bg-spotify-dark-gray hover:border-white/30",
              )}
            >
              <Upload
                size={48}
                className={cn(
                  "mx-auto mb-4",
                  dragActive ? "text-spotify-green" : "text-spotify-text-gray",
                )}
              />
              <p className="text-white font-medium mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-sm text-spotify-text-gray mb-4">
                Supports: JPG, PNG, PDF (Max 10MB per file)
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept="image/jpeg,image/png,image/jpg,application/pdf"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
              <label
                htmlFor="file-upload"
                className="inline-block cursor-pointer"
              >
                <Button type="button" variant="secondary">
                  Choose Files
                </Button>
              </label>
            </div>

            {/* Error Message */}
            {errors.files && (
              <div
                className="p-4 bg-empulse-red/10 border border-empulse-red/50 rounded-lg flex items-start gap-3"
                role="alert"
              >
                <AlertCircle
                  size={20}
                  className="text-empulse-red flex-shrink-0 mt-0.5"
                />
                <p className="text-sm text-empulse-red">{errors.files}</p>
              </div>
            )}

            {/* Uploaded Files List */}
            {proofFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium">
                  Uploaded Files ({proofFiles.length})
                </h3>
                {proofFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-spotify-light-gray rounded-lg"
                  >
                    <FileText
                      size={24}
                      className="text-spotify-text-gray flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate">
                        {file.name}
                      </div>
                      <div className="text-sm text-spotify-text-gray">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Remove file"
                    >
                      <X size={20} className="text-spotify-text-gray" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Info Box */}
            <div className="p-4 bg-blue-600/20 border border-blue-600/50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={20}
                  className="text-blue-400 flex-shrink-0 mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm text-white font-medium mb-1">
                    Approval Process
                  </p>
                  <p className="text-xs text-white/80">
                    Your submission will be reviewed by our team. This typically
                    takes 24-48 hours. You&apos;ll receive an email notification
                    once your application has been reviewed. Your free account
                    is active immediately - you can upgrade to use artist
                    features once approved.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting || isLoading}
                disabled={isSubmitting || isLoading || proofFiles.length === 0}
                className="flex-1"
              >
                Submit for Review
              </Button>
            </div>
          </form>
        </div>

        {/* What Happens Next */}
        <div className="mt-8 bg-spotify-dark-gray rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-spotify-green/20 flex items-center justify-center">
                <span className="text-spotify-green font-bold">1</span>
              </div>
              <div>
                <div className="font-medium text-white mb-1">
                  Review Process
                </div>
                <div className="text-sm text-spotify-text-gray">
                  Our team will review your documents and verify your
                  artist/management status.
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-spotify-green/20 flex items-center justify-center">
                <span className="text-spotify-green font-bold">2</span>
              </div>
              <div>
                <div className="font-medium text-white mb-1">
                  Email Notification
                </div>
                <div className="text-sm text-spotify-text-gray">
                  You&apos;ll receive an email within 24-48 hours with the
                  approval decision.
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-spotify-green/20 flex items-center justify-center">
                <span className="text-spotify-green font-bold">3</span>
              </div>
              <div>
                <div className="font-medium text-white mb-1">
                  Upgrade Options
                </div>
                <div className="text-sm text-spotify-text-gray">
                  Once approved, you can upgrade your account to access artist
                  features, or continue using the free/premium tier without
                  artist access.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
