'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Upload, Music, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ArtistSettingsPage() {
  const router = useRouter();
  const { user, submitArtistApplication } = useUserStore();
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isManagement, setIsManagement] = useState(false);
  const [proofFiles, setProofFiles] = useState<File[]>([]);

  const artistTypes = [
    { value: 'solo', label: 'Solo Artist', icon: Music },
    { value: 'band', label: 'Band/Group' },
    { value: 'producer', label: 'Producer' },
    { value: 'composer', label: 'Composer' },
    { value: 'dj', label: 'DJ' },
  ];

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setProofFiles(prev => [...prev, ...newFiles]);
  };

  const handleSubmit = async () => {
    if (selectedTypes.length === 0 && !isManagement) {
      return;
    }

    submitArtistApplication(
      selectedTypes as any,
      isManagement,
      proofFiles
    );
    
    router.push('/artist/verification/pending');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Add Artist Type</h1>
      <p className="text-spotify-text-gray mb-8">
        Apply for artist or management access. You can add this to your existing account at any time.
      </p>

      {/* Current Status */}
      {user?.artistApplication && (
        <div className="bg-spotify-dark-gray rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Current Application Status</h2>
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              user.artistApplication.approvalStatus === 'approved' 
                ? 'bg-spotify-green/20 text-spotify-green' 
                : user.artistApplication.approvalStatus === 'pending'
                ? 'bg-yellow-500/20 text-yellow-500'
                : 'bg-empulse-red/20 text-empulse-red'
            }`}>
              {user.artistApplication.approvalStatus.charAt(0).toUpperCase() + user.artistApplication.approvalStatus.slice(1)}
            </span>
            <Link href="/artist/verification/pending" className="text-spotify-green hover:underline text-sm">
              View Details
            </Link>
          </div>
        </div>
      )}

      {/* Artist Type Selection */}
      <div className="bg-spotify-dark-gray rounded-lg p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6">Select Artist Type(s)</h2>
        
        <div className="space-y-3 mb-6">
          {artistTypes.map(type => {
            const isSelected = selectedTypes.includes(type.value);
            return (
              <label
                key={type.value}
                className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-white/20"
                style={{
                  borderColor: isSelected ? '#1DB954' : '#282828',
                  backgroundColor: isSelected ? 'rgba(29, 185, 84, 0.1)' : 'transparent',
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTypes([...selectedTypes, type.value]);
                    } else {
                      setSelectedTypes(selectedTypes.filter(t => t !== type.value));
                    }
                  }}
                  className="w-5 h-5 rounded border-2 border-white/30 checked:bg-spotify-green checked:border-spotify-green"
                />
                <span className="text-white font-medium">{type.label}</span>
              </label>
            );
          })}
        </div>

        <label className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-white/20"
          style={{
            borderColor: isManagement ? '#1DB954' : '#282828',
            backgroundColor: isManagement ? 'rgba(29, 185, 84, 0.1)' : 'transparent',
          }}
        >
          <input
            type="checkbox"
            checked={isManagement}
            onChange={(e) => setIsManagement(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-white/30 checked:bg-spotify-green checked:border-spotify-green"
          />
          <span className="text-white font-medium">Management/Label</span>
        </label>
      </div>

      {/* Proof Upload */}
      {(selectedTypes.length > 0 || isManagement) && (
        <div className="bg-spotify-dark-gray rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">Upload Proof Documents</h2>
          <p className="text-spotify-text-gray mb-6">
            Provide documents that verify your artist or management status.
          </p>

          <div className="border-2 border-dashed border-spotify-light-gray rounded-lg p-8 text-center">
            <Upload size={48} className="mx-auto mb-4 text-spotify-text-gray" />
            <p className="text-white mb-4">Upload proof documents</p>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="proof-upload"
            />
            <label htmlFor="proof-upload">
              <Button variant="secondary" type="button">
                Choose Files
              </Button>
            </label>
          </div>

          {proofFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {proofFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-spotify-light-gray rounded-lg">
                  <span className="text-white text-sm">{file.name}</span>
                  <button
                    onClick={() => setProofFiles(proofFiles.filter((_, i) => i !== index))}
                    className="text-empulse-red hover:text-empulse-red/80"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={selectedTypes.length === 0 && !isManagement}
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
}
