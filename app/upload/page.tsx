'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileAudio, AlertCircle, CheckCircle } from 'lucide-react';
import { MoodState } from '@/types/mood';
import MoodSelector from '@/components/mood/MoodSelector';
import FeelingChips from '@/components/mood/FeelingChips';
import VibeSlider from '@/components/mood/VibeSlider';
import GenreSelector from '@/components/mood/GenreSelector';

interface AIMoodSuggestion {
  mood: MoodState;
  feelings: string[];
  vibe: number;
  genres: string[];
  confidence: number;
}

export default function UploadPage() {
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    trackName: '',
    artist: '',
    album: '',
    releaseDate: '',
    genre: '',
    isrc: '',
  });
  
  // AI Mood Suggestions (simulated)
  const [aiSuggestions, setAiSuggestions] = useState<AIMoodSuggestion | null>(null);
  const [artistMoodTags, setArtistMoodTags] = useState<AIMoodSuggestion | null>(null);
  const [hasAdjusted, setHasAdjusted] = useState(false);
  const [accuracyCertified, setAccuracyCertified] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.mp4'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setUploadedFile(acceptedFiles[0]);
        // Simulate AI mood analysis
        setTimeout(() => {
          setAiSuggestions({
            mood: 'Joyful',
            feelings: ['Great', 'Excited'],
            vibe: 75,
            genres: ['Pop', 'Electronic'],
            confidence: 0.85,
          });
          // Initialize artist tags with AI suggestions
          setArtistMoodTags({
            mood: 'Joyful',
            feelings: ['Great', 'Excited'],
            vibe: 75,
            genres: ['Pop', 'Electronic'],
            confidence: 0.85,
          });
        }, 1000);
      }
    },
  });

  const handleMoodChange = (field: keyof AIMoodSuggestion, value: any) => {
    if (artistMoodTags) {
      const updated = { ...artistMoodTags, [field]: value };
      setArtistMoodTags(updated);
      // Check if artist has made any changes
      if (aiSuggestions) {
        const hasChanges = 
          updated.mood !== aiSuggestions.mood ||
          JSON.stringify(updated.feelings.sort()) !== JSON.stringify(aiSuggestions.feelings.sort()) ||
          Math.abs(updated.vibe - aiSuggestions.vibe) > 5 ||
          JSON.stringify(updated.genres.sort()) !== JSON.stringify(aiSuggestions.genres.sort());
        setHasAdjusted(hasChanges || true); // Allow submission if confirmed accurate
      }
    }
  };

  const handleToggleFeeling = (feeling: string) => {
    if (artistMoodTags) {
      const feelings = artistMoodTags.feelings.includes(feeling)
        ? artistMoodTags.feelings.filter(f => f !== feeling)
        : [...artistMoodTags.feelings, feeling];
      handleMoodChange('feelings', feelings);
    }
  };

  const handleToggleGenre = (genre: string) => {
    if (artistMoodTags) {
      const genres = artistMoodTags.genres.includes(genre)
        ? artistMoodTags.genres.filter(g => g !== genre)
        : [...artistMoodTags.genres, genre];
      handleMoodChange('genres', genres);
    }
  };

  const canProceed = () => {
    if (step === 1) return uploadedFile !== null;
    if (step === 2) return metadata.trackName && metadata.artist;
    if (step === 3) return hasAdjusted && accuracyCertified && artistMoodTags !== null;
    return false;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Upload Track</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step ? 'bg-spotify-green text-black' : 'bg-spotify-light-gray text-spotify-text-gray'
                }`}
              >
                {s < step ? <CheckCircle size={20} /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-16 h-1 mx-1 ${
                    s < step ? 'bg-spotify-green' : 'bg-spotify-light-gray'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-spotify-text-gray mt-2">
          <span>Upload File</span>
          <span>Metadata</span>
          <span>Mood Tags</span>
          <span>Review</span>
        </div>
      </div>

      {/* Step 1: File Upload */}
      {step === 1 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 1: Upload Audio File</h2>
          
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-spotify-green bg-spotify-green/10'
                : 'border-spotify-text-gray/30 hover:border-spotify-text-gray/60'
            }`}
          >
            <input {...getInputProps()} />
            <Upload size={48} className="mx-auto mb-4 text-spotify-text-gray" />
            {uploadedFile ? (
              <div>
                <FileAudio size={32} className="mx-auto mb-2 text-spotify-green" />
                <p className="font-medium text-white">{uploadedFile.name}</p>
                <p className="text-sm text-spotify-text-gray mt-1">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <p className="text-white font-medium mb-2">Drag & drop your audio file here</p>
                <p className="text-spotify-text-gray text-sm mb-4">or click to browse</p>
                <p className="text-xs text-spotify-text-gray">
                  Supported formats: WAV, FLAC, MP3 (320kbps+), M4A, MP4
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">Quality Requirements</h3>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• Preferred: WAV (lossless), FLAC</li>
              <li>• Accepted: MP3 (320kbps minimum), M4A, MP4/AAC</li>
              <li>• Minimum quality: 192kbps MP3</li>
              <li>• Cover art: Minimum 3000x3000px recommended</li>
            </ul>
          </div>

          {uploadedFile && (
            <button
              onClick={() => setStep(2)}
              className="btn-primary w-full mt-6"
            >
              Continue to Metadata
            </button>
          )}
        </div>
      )}

      {/* Step 2: Metadata Form */}
      {step === 2 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 2: Track Metadata</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Track Name *</label>
              <input
                type="text"
                value={metadata.trackName}
                onChange={(e) => setMetadata({ ...metadata, trackName: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="Enter track name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Artist *</label>
              <input
                type="text"
                value={metadata.artist}
                onChange={(e) => setMetadata({ ...metadata, artist: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="Enter artist name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Album</label>
              <input
                type="text"
                value={metadata.album}
                onChange={(e) => setMetadata({ ...metadata, album: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="Enter album name (optional)"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Release Date</label>
                <input
                  type="date"
                  value={metadata.releaseDate}
                  onChange={(e) => setMetadata({ ...metadata, releaseDate: e.target.value })}
                  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ISRC Code</label>
                <input
                  type="text"
                  value={metadata.isrc}
                  onChange={(e) => setMetadata({ ...metadata, isrc: e.target.value })}
                  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="USRC17607839"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Art Upload</label>
              <input
                type="file"
                accept="image/*"
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              />
              <p className="text-xs text-spotify-text-gray mt-1">Minimum 3000x3000px recommended</p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(1)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!canProceed()}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Mood Tags
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Mandatory Mood Tag Adjustment */}
      {step === 3 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <div className="flex items-start gap-3 mb-6 bg-red-600/20 border border-red-600/50 rounded-lg p-4">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-bold text-red-500 mb-1">⚠️ REQUIRED: Mood Tag Adjustment</h3>
              <p className="text-sm text-white/80">
                AI has pre-populated mood tags for your track. You <strong>MUST</strong> review, adjust if needed, and certify accuracy before submitting.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Step 3: Adjust & Certify Mood Tags</h2>

          {/* AI Suggestions Display */}
          {aiSuggestions && (
            <div className="mb-6 bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                AI Suggestions (Confidence: {Math.round(aiSuggestions.confidence * 100)}%)
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-spotify-text-gray">Mood:</span>{' '}
                  <span className="font-medium">{aiSuggestions.mood}</span>
                </div>
                <div>
                  <span className="text-spotify-text-gray">Vibe:</span>{' '}
                  <span className="font-medium">{aiSuggestions.vibe}%</span>
                </div>
                <div>
                  <span className="text-spotify-text-gray">Feelings:</span>{' '}
                  <span className="font-medium">{aiSuggestions.feelings.join(', ')}</span>
                </div>
                <div>
                  <span className="text-spotify-text-gray">Genres:</span>{' '}
                  <span className="font-medium">{aiSuggestions.genres.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Artist Mood Tag Adjustment Interface */}
          {artistMoodTags && (
            <div>
              <MoodSelector
                selectedMood={artistMoodTags.mood}
                onSelect={(mood) => handleMoodChange('mood', mood)}
              />

              <FeelingChips
                selectedFeelings={artistMoodTags.feelings}
                onToggle={handleToggleFeeling}
              />

              <VibeSlider
                value={artistMoodTags.vibe}
                onChange={(vibe) => handleMoodChange('vibe', vibe)}
              />

              <GenreSelector
                selectedGenres={artistMoodTags.genres}
                onToggle={handleToggleGenre}
              />
            </div>
          )}

          {/* Accuracy Certification */}
          <div className="mt-6 bg-spotify-dark-gray rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accuracyCertified}
                onChange={(e) => setAccuracyCertified(e.target.checked)}
                className="mt-1 rounded"
              />
              <span className="text-sm">
                <strong className="text-white">I certify</strong> that these mood tags accurately represent this track. 
                I have reviewed the AI suggestions and made necessary adjustments to ensure accuracy.
              </span>
            </label>
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(2)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!canProceed()}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 4: Review & Submit</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">File</h3>
              <p className="text-spotify-text-gray">{uploadedFile?.name}</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Metadata</h3>
              <div className="text-spotify-text-gray space-y-1">
                <p><strong className="text-white">Track:</strong> {metadata.trackName}</p>
                <p><strong className="text-white">Artist:</strong> {metadata.artist}</p>
                {metadata.album && (
                  <p><strong className="text-white">Album:</strong> {metadata.album}</p>
                )}
              </div>
            </div>

            {artistMoodTags && (
              <div>
                <h3 className="font-bold mb-2">Mood Tags (Certified)</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-empulse-purple/20 text-empulse-purple rounded-full text-sm">
                    {artistMoodTags.mood}
                  </span>
                  {artistMoodTags.feelings.map((feeling) => (
                    <span key={feeling} className="px-3 py-1 bg-empulse-blue/20 text-empulse-blue rounded-full text-sm">
                      {feeling}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-empulse-red/20 text-empulse-red rounded-full text-sm">
                    Vibe: {artistMoodTags.vibe}%
                  </span>
                  {artistMoodTags.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(3)} className="btn-secondary">
              Back
            </button>
            <button className="btn-primary flex-1">
              Submit for Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
