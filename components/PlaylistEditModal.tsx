"use client";

import { useState, useEffect } from "react";
import { X, Upload, Lock, Globe, Users } from "lucide-react";
import { Playlist } from "@/types/playlist";
import { cn } from "@/lib/utils";

interface PlaylistEditModalProps {
  playlist: Playlist;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<Playlist>) => void;
}

type PrivacyOption = "public" | "private" | "unlisted";

export default function PlaylistEditModal({
  playlist,
  isOpen,
  onClose,
  onSave,
}: PlaylistEditModalProps) {
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description || "");
  const [privacy, setPrivacy] = useState<PrivacyOption>("public");
  const [coverArt, setCoverArt] = useState<string | null>(playlist.coverArt);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(playlist.name);
      setDescription(playlist.description || "");
      setCoverArt(playlist.coverArt);
      // In production, get actual privacy setting from playlist
    }
  }, [isOpen, playlist]);

  const handleSave = () => {
    onSave({
      name,
      description,
      coverArt: coverArt || undefined,
      // privacy would be set here in production
    });
    onClose();
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // In production, upload to CDN/storage
    // For now, create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverArt(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <div className="bg-spotify-dark-gray rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 bg-spotify-dark-gray border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold">Edit Playlist Details</h2>
          <button
            onClick={onClose}
            className="text-spotify-text-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cover Art Upload */}
          <div className="flex items-center gap-6">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden bg-spotify-light-gray flex-shrink-0">
              {coverArt ? (
                <img
                  src={coverArt}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-spotify-text-gray">
                  <Upload size={32} />
                </div>
              )}
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Upload size={24} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Cover Art
              </label>
              <label className="inline-block px-4 py-2 bg-spotify-light-gray hover:bg-spotify-light-gray/80 rounded-full text-sm cursor-pointer transition-colors">
                <Upload size={16} className="inline mr-2" />
                {isUploading ? "Uploading..." : "Choose Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              <p className="text-xs text-spotify-text-gray mt-2">
                Choose a square image, at least 640x640 pixels
              </p>
            </div>
          </div>

          {/* Playlist Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-spotify-light-gray text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-spotify-green"
              placeholder="My Playlist"
              maxLength={100}
            />
            <p className="text-xs text-spotify-text-gray mt-1">
              {name.length}/100
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-spotify-light-gray text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-spotify-green min-h-[100px] resize-y"
              placeholder="Add an optional description"
              maxLength={300}
            />
            <p className="text-xs text-spotify-text-gray mt-1">
              {description.length}/300
            </p>
          </div>

          {/* Privacy Settings */}
          <div>
            <label className="block text-sm font-medium mb-3">Privacy</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded hover:bg-white/10 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={privacy === "public"}
                  onChange={(e) => setPrivacy(e.target.value as PrivacyOption)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    privacy === "public"
                      ? "border-spotify-green"
                      : "border-spotify-text-gray",
                  )}
                >
                  {privacy === "public" && (
                    <div className="w-3 h-3 bg-spotify-green rounded-full" />
                  )}
                </div>
                <Globe size={20} className="text-spotify-text-gray" />
                <div>
                  <div className="font-medium">Public</div>
                  <div className="text-sm text-spotify-text-gray">
                    Anyone can find and play this playlist
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded hover:bg-white/10 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="unlisted"
                  checked={privacy === "unlisted"}
                  onChange={(e) => setPrivacy(e.target.value as PrivacyOption)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    privacy === "unlisted"
                      ? "border-spotify-green"
                      : "border-spotify-text-gray",
                  )}
                >
                  {privacy === "unlisted" && (
                    <div className="w-3 h-3 bg-spotify-green rounded-full" />
                  )}
                </div>
                <Users size={20} className="text-spotify-text-gray" />
                <div>
                  <div className="font-medium">Unlisted</div>
                  <div className="text-sm text-spotify-text-gray">
                    Only people with the link can play
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded hover:bg-white/10 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={privacy === "private"}
                  onChange={(e) => setPrivacy(e.target.value as PrivacyOption)}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    privacy === "private"
                      ? "border-spotify-green"
                      : "border-spotify-text-gray",
                  )}
                >
                  {privacy === "private" && (
                    <div className="w-3 h-3 bg-spotify-green rounded-full" />
                  )}
                </div>
                <Lock size={20} className="text-spotify-text-gray" />
                <div>
                  <div className="font-medium">Private</div>
                  <div className="text-sm text-spotify-text-gray">
                    Only you can access this playlist
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-transparent text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-white text-black hover:scale-105 transition-transform font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
