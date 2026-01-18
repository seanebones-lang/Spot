'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileAudio, AlertCircle, CheckCircle, Plus, X, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { MoodState } from '@/types/mood';
import { Contributor, Publisher } from '@/types/track';
import MoodSelector from '@/components/mood/MoodSelector';
import FeelingChips from '@/components/mood/FeelingChips';
import VibeSlider from '@/components/mood/VibeSlider';
import GenreSelector from '@/components/mood/GenreSelector';
import { getRAGPipeline } from '@/lib/aiMoodAnalysis';

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
  const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
  
  // Basic metadata
  const [metadata, setMetadata] = useState({
    trackName: '',
    artistFullLegalName: '',
    featuredArtists: [] as Array<{ fullLegalName: string; role?: string }>,
    album: '',
    releaseDate: '',
    genre: '',
    subgenre: '',
    isrc: '',
  });
  
  // Legal & rights metadata
  const [composers, setComposers] = useState<Contributor[]>([
    { firstName: '', lastName: '', role: 'Composer & Lyricist', ownershipPercentage: 100 },
  ]);
  const [lyricists, setLyricists] = useState<Contributor[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([
    { name: 'Self-Published' },
  ]);
  const [rightsMetadata, setRightsMetadata] = useState({
    iswc: '',
    upc: '',
    ean: '',
    proAffiliation: '' as 'ASCAP' | 'BMI' | 'SESAC' | 'GMR' | 'Multiple' | 'None' | '',
    proAffiliationDetails: '',
    explicitContent: false,
    territoryRights: 'worldwide' as 'worldwide' | string[],
  });
  
  // Legal warranties
  const [legalWarranties, setLegalWarranties] = useState({
    ownsMasterRights: false,
    isOriginalComposition: false,
    samplesCleared: false,
    hasMechanicalLicenses: false,
    agreesToIndemnify: false,
  });
  
  // AI Mood Suggestions
  const [aiSuggestions, setAiSuggestions] = useState<AIMoodSuggestion | null>(null);
  const [artistMoodTags, setArtistMoodTags] = useState<AIMoodSuggestion | null>(null);
  const [hasAdjusted, setHasAdjusted] = useState(false);
  const [accuracyCertified, setAccuracyCertified] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a', '.mp4'],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        
        // Run RAG mood analysis pipeline
        try {
          const ragPipeline = getRAGPipeline();
          const moodSuggestion = await ragPipeline.analyzeMood(file);
          
          setAiSuggestions(moodSuggestion);
          setArtistMoodTags({
            mood: moodSuggestion.mood,
            feelings: moodSuggestion.feelings,
            vibe: moodSuggestion.vibe,
            genres: moodSuggestion.genres,
            confidence: moodSuggestion.confidence,
          });
        } catch (error) {
          console.error('Error in RAG mood analysis:', error);
          // Fallback to default values
          setAiSuggestions({
            mood: 'Content',
            feelings: [],
            vibe: 50,
            genres: [],
            confidence: 0.5,
          });
          setArtistMoodTags({
            mood: 'Content',
            feelings: [],
            vibe: 50,
            genres: [],
            confidence: 0.5,
          });
        }
      }
    },
  });

  // Contributor management
  const addContributor = (type: 'composer' | 'lyricist') => {
    const newContributor: Contributor = {
      firstName: '',
      lastName: '',
      role: type === 'composer' ? 'Composer' : 'Lyricist',
      ownershipPercentage: 0,
    };
    if (type === 'composer') {
      setComposers([...composers, newContributor]);
    } else {
      setLyricists([...lyricists, newContributor]);
    }
  };

  const updateContributor = (
    type: 'composer' | 'lyricist',
    index: number,
    field: keyof Contributor,
    value: any
  ) => {
    if (type === 'composer') {
      const updated = [...composers];
      updated[index] = { ...updated[index], [field]: value };
      setComposers(updated);
    } else {
      const updated = [...lyricists];
      updated[index] = { ...updated[index], [field]: value };
      setLyricists(updated);
    }
  };

  const removeContributor = (type: 'composer' | 'lyricist', index: number) => {
    if (type === 'composer') {
      setComposers(composers.filter((_, i) => i !== index));
    } else {
      setLyricists(lyricists.filter((_, i) => i !== index));
    }
  };

  const addPublisher = () => {
    setPublishers([...publishers, { name: '', contactEmail: '', contactPhone: '' }]);
  };

  const updatePublisher = (index: number, field: keyof Publisher, value: string) => {
    const updated = [...publishers];
    updated[index] = { ...updated[index], [field]: value };
    setPublishers(updated);
  };

  const removePublisher = (index: number) => {
    setPublishers(publishers.filter((_, i) => i !== index));
  };

  // Validation
  const compositionOwnershipTotal = [...composers, ...lyricists].reduce(
    (sum, c) => sum + (c.ownershipPercentage || 0),
    0
  );

  const handleMoodChange = (field: keyof AIMoodSuggestion, value: any) => {
    if (artistMoodTags) {
      const updated = { ...artistMoodTags, [field]: value };
      setArtistMoodTags(updated);
      if (aiSuggestions) {
        const hasChanges =
          updated.mood !== aiSuggestions.mood ||
          JSON.stringify(updated.feelings.sort()) !== JSON.stringify(aiSuggestions.feelings.sort()) ||
          Math.abs(updated.vibe - aiSuggestions.vibe) > 5 ||
          JSON.stringify(updated.genres.sort()) !== JSON.stringify(aiSuggestions.genres.sort());
        setHasAdjusted(hasChanges || true);
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
    if (step === 2) {
      return metadata.trackName && metadata.artistFullLegalName;
    }
    if (step === 3) {
      const hasComposers = composers.length > 0 && composers.every(c => c.firstName && c.lastName);
      const ownershipValid = Math.abs(compositionOwnershipTotal - 100) < 0.01;
      return hasComposers && ownershipValid;
    }
    if (step === 4) {
      return Object.values(legalWarranties).every(v => v === true);
    }
    if (step === 5) {
      return hasAdjusted && accuracyCertified && artistMoodTags !== null;
    }
    return false;
  };

  const totalSteps = 6;
  const stepLabels = ['Upload', 'Basic Info', 'Rights', 'Legal', 'Mood Tags', 'Review'];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Upload Track</h1>
        <div className="flex gap-3 text-sm">
          <Link href="/help/upload-guidelines" className="text-spotify-green hover:underline flex items-center gap-1">
            <Info size={16} />
            Upload Guidelines
          </Link>
          <Link href="/legal/pro-guide" className="text-spotify-green hover:underline flex items-center gap-1">
            <Info size={16} />
            PRO Guide
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step ? 'bg-spotify-green text-black' : 'bg-spotify-light-gray text-spotify-text-gray'
                  }`}
                >
                  {s < step ? <CheckCircle size={20} /> : s}
                </div>
              </div>
              {s < totalSteps && (
                <div
                  className={`h-1 flex-1 mx-1 ${
                    s < step ? 'bg-spotify-green' : 'bg-spotify-light-gray'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-spotify-text-gray">
          {stepLabels.map((label, idx) => (
            <span key={idx} className="flex-1 text-center">
              {label}
            </span>
          ))}
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
              <li>• Artwork: Minimum 1400x1400px (3000x3000px recommended)</li>
            </ul>
          </div>

          {uploadedFile && (
            <button
              onClick={() => setStep(2)}
              className="btn-primary w-full mt-6"
            >
              Continue to Basic Info
            </button>
          )}
        </div>
      )}

      {/* Step 2: Basic Metadata */}
      {step === 2 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <div className="flex items-start gap-3 mb-6 bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4">
            <Info className="text-yellow-500 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-bold text-yellow-500 mb-1">⚠️ Legal Names Required</h3>
              <p className="text-sm text-white/80">
                Per 2025 compliance requirements, you must provide <strong>full legal names</strong> (first and last), 
                not nicknames or initials. This is required for PRO matching and royalty distribution.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Step 2: Basic Track Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Track Title *</label>
              <input
                type="text"
                value={metadata.trackName}
                onChange={(e) => setMetadata({ ...metadata, trackName: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="Enter exact track title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Artist Full Legal Name (Primary) *</label>
              <input
                type="text"
                value={metadata.artistFullLegalName}
                onChange={(e) => setMetadata({ ...metadata, artistFullLegalName: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="First Name Last Name (e.g., John Smith)"
                required
              />
              <p className="text-xs text-spotify-text-gray mt-1">Full legal first and last name required for PRO matching</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Featured Artist(s) (Optional)</label>
              {metadata.featuredArtists.map((artist, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={artist.fullLegalName}
                    onChange={(e) => {
                      const updated = [...metadata.featuredArtists];
                      updated[idx].fullLegalName = e.target.value;
                      setMetadata({ ...metadata, featuredArtists: updated });
                    }}
                    className="flex-1 bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                    placeholder="Full Legal Name"
                  />
                  <button
                    onClick={() => setMetadata({ ...metadata, featuredArtists: metadata.featuredArtists.filter((_, i) => i !== idx) })}
                    className="px-3 py-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setMetadata({ ...metadata, featuredArtists: [...metadata.featuredArtists, { fullLegalName: '' }] })}
                className="text-sm text-spotify-green hover:underline flex items-center gap-1"
              >
                <Plus size={16} /> Add Featured Artist
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Album/EP Title (Optional)</label>
              <input
                type="text"
                value={metadata.album}
                onChange={(e) => setMetadata({ ...metadata, album: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="Enter album/EP title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Release Date *</label>
                <input
                  type="date"
                  value={metadata.releaseDate}
                  onChange={(e) => setMetadata({ ...metadata, releaseDate: e.target.value })}
                  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ISRC Code</label>
                <input
                  type="text"
                  value={metadata.isrc}
                  onChange={(e) => setMetadata({ ...metadata, isrc: e.target.value })}
                  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="USRC17607839 (auto-generated if empty)"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Genre *</label>
                <select
                  value={metadata.genre}
                  onChange={(e) => setMetadata({ ...metadata, genre: e.target.value })}
                  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  required
                >
                  <option value="">Select genre</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Hip-Hop">Hip-Hop</option>
                  <option value="R&B">R&B</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Classical">Classical</option>
                  <option value="Country">Country</option>
                  <option value="Folk">Folk</option>
                  <option value="Alternative">Alternative</option>
                  <option value="Indie">Indie</option>
                  <option value="Metal">Metal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subgenre (Optional)</label>
                <input
                  type="text"
                  value={metadata.subgenre}
                  onChange={(e) => setMetadata({ ...metadata, subgenre: e.target.value })}
                  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="e.g., Synth-pop, Chillwave"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cover Art * (JPEG/PNG, min 1400x1400px)</label>
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => e.target.files?.[0] && setCoverArtFile(e.target.files[0])}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                required
              />
              {coverArtFile && (
                <p className="text-xs text-spotify-text-gray mt-1">Selected: {coverArtFile.name}</p>
              )}
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
              Continue to Rights Metadata
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Legal & Rights Metadata */}
      {step === 3 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <div className="flex items-start gap-3 mb-6 bg-red-600/20 border border-red-600/50 rounded-lg p-4">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-bold text-red-500 mb-1">⚠️ CRITICAL: Rights Metadata Required</h3>
              <p className="text-sm text-white/80">
                This information is required for legal compliance and royalty distribution to PROs/MLC. 
                Incomplete submissions will be rejected automatically.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Step 3: Rights & Ownership Metadata</h2>

          {/* Composers */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium">Composer(s)/Songwriter(s) *</label>
              <button
                onClick={() => addContributor('composer')}
                className="text-sm text-spotify-green hover:underline flex items-center gap-1"
              >
                <Plus size={16} /> Add Composer
              </button>
            </div>
            <p className="text-xs text-spotify-text-gray mb-3">
              Full legal names (first and last) required. Ownership percentages must total 100%.
            </p>
            {composers.map((composer, idx) => (
              <div key={idx} className="bg-spotify-dark-gray rounded-lg p-4 mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-white">Composer {idx + 1}</span>
                  {composers.length > 1 && (
                    <button
                      onClick={() => removeContributor('composer', idx)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">First Name (Legal) *</label>
                    <input
                      type="text"
                      value={composer.firstName}
                      onChange={(e) => updateContributor('composer', idx, 'firstName', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Last Name (Legal) *</label>
                    <input
                      type="text"
                      value={composer.lastName}
                      onChange={(e) => updateContributor('composer', idx, 'lastName', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Role *</label>
                    <select
                      value={composer.role}
                      onChange={(e) => updateContributor('composer', idx, 'role', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                    >
                      <option value="Composer">Composer</option>
                      <option value="Lyricist">Lyricist</option>
                      <option value="Composer & Lyricist">Composer & Lyricist</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Ownership % *</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={composer.ownershipPercentage}
                      onChange={(e) => updateContributor('composer', idx, 'ownershipPercentage', parseFloat(e.target.value) || 0)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">IPI/CAE Number</label>
                    <input
                      type="text"
                      value={composer.ipiNumber || ''}
                      onChange={(e) => updateContributor('composer', idx, 'ipiNumber', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className={`text-sm mt-2 ${Math.abs(compositionOwnershipTotal - 100) < 0.01 ? 'text-green-400' : 'text-red-400'}`}>
              Total Ownership: {compositionOwnershipTotal.toFixed(2)}% 
              {Math.abs(compositionOwnershipTotal - 100) >= 0.01 && ' (Must equal 100%)'}
            </div>
          </div>

          {/* Lyricists (separate if different from composers) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium">Lyricist(s) (If Different from Composer)</label>
              <button
                onClick={() => addContributor('lyricist')}
                className="text-sm text-spotify-green hover:underline flex items-center gap-1"
              >
                <Plus size={16} /> Add Lyricist
              </button>
            </div>
            {lyricists.length === 0 && (
              <p className="text-xs text-spotify-text-gray mb-3 italic">
                Only add if lyricists are different from composers above.
              </p>
            )}
            {lyricists.map((lyricist, idx) => (
              <div key={idx} className="bg-spotify-dark-gray rounded-lg p-4 mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-white">Lyricist {idx + 1}</span>
                  <button
                    onClick={() => removeContributor('lyricist', idx)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">First Name (Legal) *</label>
                    <input
                      type="text"
                      value={lyricist.firstName}
                      onChange={(e) => updateContributor('lyricist', idx, 'firstName', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Last Name (Legal) *</label>
                    <input
                      type="text"
                      value={lyricist.lastName}
                      onChange={(e) => updateContributor('lyricist', idx, 'lastName', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Role *</label>
                    <select
                      value={lyricist.role}
                      onChange={(e) => updateContributor('lyricist', idx, 'role', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                    >
                      <option value="Lyricist">Lyricist</option>
                      <option value="Composer">Composer</option>
                      <option value="Composer & Lyricist">Composer & Lyricist</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Ownership % *</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={lyricist.ownershipPercentage}
                      onChange={(e) => updateContributor('lyricist', idx, 'ownershipPercentage', parseFloat(e.target.value) || 0)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">IPI/CAE Number</label>
                    <input
                      type="text"
                      value={lyricist.ipiNumber || ''}
                      onChange={(e) => updateContributor('lyricist', idx, 'ipiNumber', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Publishers */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium">Publisher(s)</label>
              <button
                onClick={addPublisher}
                className="text-sm text-spotify-green hover:underline flex items-center gap-1"
              >
                <Plus size={16} /> Add Publisher
              </button>
            </div>
            <p className="text-xs text-spotify-text-gray mb-3">
              Add publisher name if affiliated. If independent/self-published, leave as "Self-Published".
            </p>
            {publishers.map((publisher, idx) => (
              <div key={idx} className="bg-spotify-dark-gray rounded-lg p-4 mb-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-white">Publisher {idx + 1}</span>
                  {publishers.length > 1 && (
                    <button
                      onClick={() => removePublisher(idx)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Publisher Name *</label>
                    <input
                      type="text"
                      value={publisher.name}
                      onChange={(e) => updatePublisher(idx, 'name', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      placeholder="Self-Published or Publisher Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">IPI/CAE Number</label>
                    <input
                      type="text"
                      value={publisher.ipiNumber || ''}
                      onChange={(e) => updatePublisher(idx, 'ipiNumber', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={publisher.contactEmail || ''}
                      onChange={(e) => updatePublisher(idx, 'contactEmail', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-spotify-text-gray mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={publisher.contactPhone || ''}
                      onChange={(e) => updatePublisher(idx, 'contactPhone', e.target.value)}
                      className="w-full bg-black rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-spotify-green"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Identification Codes */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Additional Identification Codes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ISWC Code (Composition)</label>
                <input
                  type="text"
                  value={rightsMetadata.iswc}
                  onChange={(e) => setRightsMetadata({ ...rightsMetadata, iswc: e.target.value })}
                  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="Optional (aids MLC matching)"
                />
                <p className="text-xs text-spotify-text-gray mt-1">International Standard Musical Work Code</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">UPC/EAN (Album)</label>
                <input
                  type="text"
                  value={rightsMetadata.upc || rightsMetadata.ean}
                  onChange={(e) => setRightsMetadata({ ...rightsMetadata, upc: e.target.value })}
                  className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                  placeholder="Auto-generated if empty"
                />
                <p className="text-xs text-spotify-text-gray mt-1">For albums/EPs</p>
              </div>
            </div>
          </div>

          {/* PRO Affiliation */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">PRO Affiliation (Performance Rights Organization)</label>
            <select
              value={rightsMetadata.proAffiliation}
              onChange={(e) => setRightsMetadata({ ...rightsMetadata, proAffiliation: e.target.value as any })}
              className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
            >
              <option value="">Select PRO</option>
              <option value="ASCAP">ASCAP</option>
              <option value="BMI">BMI</option>
              <option value="SESAC">SESAC</option>
              <option value="GMR">Global Music Rights (GMR)</option>
              <option value="Multiple">Multiple PROs</option>
              <option value="None">Not yet registered</option>
            </select>
            <p className="text-xs text-spotify-text-gray mt-1">
              Register with ASCAP (<a href="https://www.ascap.com" target="_blank" rel="noopener noreferrer" className="text-spotify-green hover:underline">ascap.com</a>), 
              BMI (<a href="https://www.bmi.com" target="_blank" rel="noopener noreferrer" className="text-spotify-green hover:underline">bmi.com</a>), 
              or SESAC (<a href="https://www.sesac.com" target="_blank" rel="noopener noreferrer" className="text-spotify-green hover:underline">sesac.com</a>) 
              to collect performance royalties.
            </p>
            {rightsMetadata.proAffiliation === 'Multiple' && (
              <input
                type="text"
                value={rightsMetadata.proAffiliationDetails}
                onChange={(e) => setRightsMetadata({ ...rightsMetadata, proAffiliationDetails: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white mt-2 focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="List all PROs (e.g., ASCAP, BMI)"
              />
            )}
          </div>

          {/* Explicit Content & Territory */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Explicit Content</label>
              <select
                value={rightsMetadata.explicitContent ? 'yes' : 'no'}
                onChange={(e) => setRightsMetadata({ ...rightsMetadata, explicitContent: e.target.value === 'yes' })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              >
                <option value="no">No</option>
                <option value="yes">Yes (Parental Advisory)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Territory Rights</label>
              <select
                value={rightsMetadata.territoryRights === 'worldwide' ? 'worldwide' : 'specific'}
                onChange={(e) => setRightsMetadata({ 
                  ...rightsMetadata, 
                  territoryRights: e.target.value === 'worldwide' ? 'worldwide' : [] 
                })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              >
                <option value="worldwide">Worldwide</option>
                <option value="specific">Specific Territories</option>
              </select>
            </div>
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
              Continue to Legal Declarations
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Legal Warranties & Declarations */}
      {step === 4 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <div className="flex items-start gap-3 mb-6 bg-red-600/20 border border-red-600/50 rounded-lg p-4">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-bold text-red-500 mb-1">⚠️ LEGAL WARRANTIES REQUIRED</h3>
              <p className="text-sm text-white/80">
                All declarations must be confirmed to proceed. False declarations may result in content takedown, 
                account termination, and legal liability. Timestamps and IP addresses are recorded for audits.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Step 4: Legal Warranties & Declarations</h2>

          <div className="space-y-4">
            <div className="bg-spotify-dark-gray rounded-lg p-4 border-l-4 border-red-500">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={legalWarranties.ownsMasterRights}
                  onChange={(e) => setLegalWarranties({ ...legalWarranties, ownsMasterRights: e.target.checked })}
                  className="mt-1 rounded"
                  required
                />
                <div className="flex-1">
                  <span className="font-bold text-white">Master Recording Rights Ownership *</span>
                  <p className="text-sm text-spotify-text-gray mt-1">
                    I confirm that I own and/or control 100% of the master recording rights for this track, 
                    or I have valid licenses from all rights holders to distribute this recording.
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-spotify-dark-gray rounded-lg p-4 border-l-4 border-red-500">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={legalWarranties.isOriginalComposition}
                  onChange={(e) => setLegalWarranties({ ...legalWarranties, isOriginalComposition: e.target.checked })}
                  className="mt-1 rounded"
                  required
                />
                <div className="flex-1">
                  <span className="font-bold text-white">Original Composition *</span>
                  <p className="text-sm text-spotify-text-gray mt-1">
                    I warrant that this composition is original, or I have obtained all necessary licenses 
                    for any interpolations, samples, or covers. I have properly cleared all third-party material.
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-spotify-dark-gray rounded-lg p-4 border-l-4 border-red-500">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={legalWarranties.samplesCleared}
                  onChange={(e) => setLegalWarranties({ ...legalWarranties, samplesCleared: e.target.checked })}
                  className="mt-1 rounded"
                  required
                />
                <div className="flex-1">
                  <span className="font-bold text-white">Samples & Covers Cleared *</span>
                  <p className="text-sm text-spotify-text-gray mt-1">
                    I confirm that all samples, interpolations, and covers have been properly cleared. 
                    For covers, I have obtained mechanical licenses via the Harry Fox Agency (HFA) or 
                    Mechanical Licensing Collective (MLC) as required.
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-spotify-dark-gray rounded-lg p-4 border-l-4 border-yellow-500">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={legalWarranties.hasMechanicalLicenses}
                  onChange={(e) => setLegalWarranties({ ...legalWarranties, hasMechanicalLicenses: e.target.checked })}
                  className="mt-1 rounded"
                  required
                />
                <div className="flex-1">
                  <span className="font-bold text-white">Mechanical Licenses (If Applicable) *</span>
                  <p className="text-sm text-spotify-text-gray mt-1">
                    If this track is a cover or uses samples requiring mechanical licenses, 
                    I confirm that I have obtained all necessary mechanical licenses from HFA/MLC.
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-spotify-dark-gray rounded-lg p-4 border-l-4 border-red-500">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={legalWarranties.agreesToIndemnify}
                  onChange={(e) => setLegalWarranties({ ...legalWarranties, agreesToIndemnify: e.target.checked })}
                  className="mt-1 rounded"
                  required
                />
                <div className="flex-1">
                  <span className="font-bold text-white">Indemnification Agreement *</span>
                  <p className="text-sm text-spotify-text-gray mt-1">
                    I agree to indemnify, defend, and hold harmless the platform, its affiliates, and 
                    their respective officers, directors, employees, and agents from and against any 
                    claims, damages, losses, liabilities, and expenses (including legal fees) arising 
                    from my breach of these warranties or any copyright infringement claims.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="mt-6 bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Info size={20} /> Legal Notice
            </h3>
            <p className="text-sm text-white/80">
              By submitting this upload, you acknowledge that false declarations may result in:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Immediate content takedown without notice</li>
                <li>Account termination and permanent ban</li>
                <li>Legal liability for copyright infringement</li>
                <li>Exposure to DMCA takedown notices and lawsuits</li>
              </ul>
              All declarations are timestamped and stored for legal audits. Your IP address is recorded.
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(3)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => setStep(5)}
              disabled={!canProceed()}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Mood Tags
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Mandatory Mood Tag Adjustment */}
      {step === 5 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <div className="flex items-start gap-3 mb-6 bg-red-600/20 border border-red-600/50 rounded-lg p-4">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-bold text-red-500 mb-1">⚠️ REQUIRED: Mood Tag Adjustment</h3>
              <p className="text-sm text-white/80">
                AI has pre-populated mood tags for your track. You <strong>MUST</strong> review, adjust if needed, 
                and certify accuracy before submitting.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Step 5: Adjust & Certify Mood Tags</h2>

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
            <button onClick={() => setStep(4)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => setStep(6)}
              disabled={!canProceed()}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Review & Submit */}
      {step === 6 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 6: Review & Submit</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">File</h3>
              <p className="text-spotify-text-gray">{uploadedFile?.name}</p>
            </div>

            <div>
              <h3 className="font-bold mb-2">Basic Metadata</h3>
              <div className="text-spotify-text-gray space-y-1">
                <p><strong className="text-white">Track:</strong> {metadata.trackName}</p>
                <p><strong className="text-white">Artist (Legal Name):</strong> {metadata.artistFullLegalName}</p>
                {metadata.featuredArtists.length > 0 && (
                  <p><strong className="text-white">Featured:</strong> {metadata.featuredArtists.map(a => a.fullLegalName).join(', ')}</p>
                )}
                {metadata.album && (
                  <p><strong className="text-white">Album:</strong> {metadata.album}</p>
                )}
                <p><strong className="text-white">Release Date:</strong> {metadata.releaseDate}</p>
                <p><strong className="text-white">Genre:</strong> {metadata.genre} {metadata.subgenre && `(${metadata.subgenre})`}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Rights & Ownership</h3>
              <div className="text-spotify-text-gray space-y-1">
                <p><strong className="text-white">Composers:</strong> {composers.map(c => `${c.firstName} ${c.lastName} (${c.ownershipPercentage}%)`).join(', ')}</p>
                {lyricists.length > 0 && (
                  <p><strong className="text-white">Lyricists:</strong> {lyricists.map(l => `${l.firstName} ${l.lastName} (${l.ownershipPercentage}%)`).join(', ')}</p>
                )}
                <p><strong className="text-white">Publishers:</strong> {publishers.map(p => p.name).join(', ')}</p>
                <p><strong className="text-white">Composition Ownership Total:</strong> {compositionOwnershipTotal.toFixed(2)}%</p>
                {rightsMetadata.iswc && <p><strong className="text-white">ISWC:</strong> {rightsMetadata.iswc}</p>}
                {metadata.isrc && <p><strong className="text-white">ISRC:</strong> {metadata.isrc}</p>}
                {rightsMetadata.proAffiliation && (
                  <p><strong className="text-white">PRO Affiliation:</strong> {rightsMetadata.proAffiliation}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Legal Declarations</h3>
              <div className="text-spotify-text-gray space-y-1">
                <p>✓ Master rights ownership confirmed</p>
                <p>✓ Original composition confirmed</p>
                <p>✓ Samples/covers cleared</p>
                <p>✓ Mechanical licenses obtained (if applicable)</p>
                <p>✓ Indemnification agreement accepted</p>
                <p>✓ Explicit content: {rightsMetadata.explicitContent ? 'Yes' : 'No'}</p>
                <p>✓ Territory rights: {rightsMetadata.territoryRights === 'worldwide' ? 'Worldwide' : 'Specific'}</p>
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

          <div className="mt-6 bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4">
            <p className="text-sm text-white/80">
              <strong>Final Submission:</strong> By clicking "Submit for Review", you confirm all information is accurate 
              and all legal warranties are true. Submission will be reviewed for compliance before distribution.
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => setStep(5)} className="btn-secondary">
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
