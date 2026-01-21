<<<<<<< HEAD
"use client";

import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
=======
'use client';

import { CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function UploadGuidelinesPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Upload Guidelines</h1>
<<<<<<< HEAD

        <div className="bg-spotify-light-gray rounded-lg p-8 space-y-6">
          <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={24}
                className="text-blue-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <h3 className="font-bold text-blue-400 mb-1">
                  Before You Upload
                </h3>
                <p className="text-sm text-white/80">
                  All uploads must comply with U.S. copyright law and platform
                  requirements. Incomplete or non-compliant submissions will be
                  automatically rejected.{" "}
                  <strong>
                    Read these guidelines carefully before uploading.
                  </strong>
=======
        
        <div className="bg-spotify-light-gray rounded-lg p-8 space-y-6">
          <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-400 mb-1">Before You Upload</h3>
                <p className="text-sm text-white/80">
                  All uploads must comply with U.S. copyright law and platform requirements. Incomplete or non-compliant 
                  submissions will be automatically rejected. <strong>Read these guidelines carefully before uploading.</strong>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold mb-4">
                1. Required Information
              </h2>

              <h3 className="text-xl font-bold mt-4 mb-2">
                1.1 Basic Track Information
              </h3>
              <div className="bg-spotify-dark-gray rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">Track Title *</strong>
                    <p className="text-sm text-white/80">
                      Exact title as it should appear to listeners (for PRO
                      matching)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Artist Full Legal Name *
                    </strong>
                    <p className="text-sm text-white/80">
                      Full legal first and last name (NOT nicknames or initials)
                      - required for PRO matching
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">Release Date *</strong>
                    <p className="text-sm text-white/80">
                      Scheduled release date (can be future-dated for
                      pre-releases)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">Genre/Subgenre *</strong>
                    <p className="text-sm text-white/80">
                      From standardized lists (for playlisting and discovery)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">Cover Art *</strong>
                    <p className="text-sm text-white/80">
                      JPEG/PNG, minimum 1400x1400px (3000x3000px recommended)
                    </p>
=======
              <h2 className="text-2xl font-bold mb-4">1. Required Information</h2>
              
              <h3 className="text-xl font-bold mt-4 mb-2">1.1 Basic Track Information</h3>
              <div className="bg-spotify-dark-gray rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Track Title *</strong>
                    <p className="text-sm text-white/80">Exact title as it should appear to listeners (for PRO matching)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Artist Full Legal Name *</strong>
                    <p className="text-sm text-white/80">Full legal first and last name (NOT nicknames or initials) - required for PRO matching</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Release Date *</strong>
                    <p className="text-sm text-white/80">Scheduled release date (can be future-dated for pre-releases)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Genre/Subgenre *</strong>
                    <p className="text-sm text-white/80">From standardized lists (for playlisting and discovery)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Cover Art *</strong>
                    <p className="text-sm text-white/80">JPEG/PNG, minimum 1400x1400px (3000x3000px recommended)</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <h3 className="text-xl font-bold mt-6 mb-2">
                1.2 Rights & Ownership Metadata (CRITICAL)
              </h3>
              <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-4">
                <p className="font-bold text-red-400 mb-2">
                  ⚠️ Required for Legal Compliance
                </p>
                <p className="text-sm text-white/80">
                  All rights metadata must be complete and accurate. Incomplete
                  submissions will be rejected automatically.
=======
              <h3 className="text-xl font-bold mt-6 mb-2">1.2 Rights & Ownership Metadata (CRITICAL)</h3>
              <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-4">
                <p className="font-bold text-red-400 mb-2">⚠️ Required for Legal Compliance</p>
                <p className="text-sm text-white/80">
                  All rights metadata must be complete and accurate. Incomplete submissions will be rejected automatically.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </p>
              </div>
              <div className="bg-spotify-dark-gray rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
<<<<<<< HEAD
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Composer(s)/Songwriter(s) Full Legal Names *
                    </strong>
                    <p className="text-sm text-white/80">
                      At least one required. Full legal first and last names (no
                      nicknames/initials). Ownership percentages must total
                      100%.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Lyricist(s) Full Legal Names (If Different)
                    </strong>
                    <p className="text-sm text-white/80">
                      Separate from composers if different. Full legal names
                      required.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">Publisher Name(s) *</strong>
                    <p className="text-sm text-white/80">
                      Publisher name if affiliated, or "Self-Published" if
                      independent
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Ownership Percentages *
                    </strong>
                    <p className="text-sm text-white/80">
                      Composition ownership splits must total exactly 100%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      IPI/CAE Numbers (Recommended)
                    </strong>
                    <p className="text-sm text-white/80">
                      Unique IDs from PROs for faster royalty payouts (optional
                      but recommended)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">ISRC Code</strong>
                    <p className="text-sm text-white/80">
                      International Standard Recording Code (auto-generated if
                      none provided)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      ISWC Code (Optional but Recommended)
                    </strong>
                    <p className="text-sm text-white/80">
                      International Standard Musical Work Code (aids MLC
                      matching)
                    </p>
=======
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Composer(s)/Songwriter(s) Full Legal Names *</strong>
                    <p className="text-sm text-white/80">At least one required. Full legal first and last names (no nicknames/initials). 
                    Ownership percentages must total 100%.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Lyricist(s) Full Legal Names (If Different)</strong>
                    <p className="text-sm text-white/80">Separate from composers if different. Full legal names required.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Publisher Name(s) *</strong>
                    <p className="text-sm text-white/80">Publisher name if affiliated, or "Self-Published" if independent</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Ownership Percentages *</strong>
                    <p className="text-sm text-white/80">Composition ownership splits must total exactly 100%</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">IPI/CAE Numbers (Recommended)</strong>
                    <p className="text-sm text-white/80">Unique IDs from PROs for faster royalty payouts (optional but recommended)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ISRC Code</strong>
                    <p className="text-sm text-white/80">International Standard Recording Code (auto-generated if none provided)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">ISWC Code (Optional but Recommended)</strong>
                    <p className="text-sm text-white/80">International Standard Musical Work Code (aids MLC matching)</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <h3 className="text-xl font-bold mt-6 mb-2">
                1.3 Legal Warranties & Declarations (MANDATORY)
              </h3>
              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 mb-4">
                <p className="font-bold text-yellow-400 mb-2">
                  ⚠️ All Declarations Must Be Confirmed
                </p>
                <p className="text-sm text-white/80">
                  False declarations may result in content takedown, account
                  termination, and legal liability. All declarations are
                  timestamped and stored for legal audits.
=======
              <h3 className="text-xl font-bold mt-6 mb-2">1.3 Legal Warranties & Declarations (MANDATORY)</h3>
              <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-4 mb-4">
                <p className="font-bold text-yellow-400 mb-2">⚠️ All Declarations Must Be Confirmed</p>
                <p className="text-sm text-white/80">
                  False declarations may result in content takedown, account termination, and legal liability. 
                  All declarations are timestamped and stored for legal audits.
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </p>
              </div>
              <div className="bg-spotify-dark-gray rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
<<<<<<< HEAD
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Master Recording Rights Ownership *
                    </strong>
                    <p className="text-sm text-white/80">
                      Confirm you own/control 100% of master rights or have
                      valid licenses
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Original Composition Warranty *
                    </strong>
                    <p className="text-sm text-white/80">
                      Confirm composition is original or all samples/covers are
                      cleared
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Samples/Covers Cleared *
                    </strong>
                    <p className="text-sm text-white/80">
                      Confirm all samples/covers have mechanical licenses (via
                      HFA/MLC for covers)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Indemnification Agreement *
                    </strong>
                    <p className="text-sm text-white/80">
                      Agree to indemnify platform against copyright claims
                    </p>
=======
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Master Recording Rights Ownership *</strong>
                    <p className="text-sm text-white/80">Confirm you own/control 100% of master rights or have valid licenses</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Original Composition Warranty *</strong>
                    <p className="text-sm text-white/80">Confirm composition is original or all samples/covers are cleared</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Samples/Covers Cleared *</strong>
                    <p className="text-sm text-white/80">Confirm all samples/covers have mechanical licenses (via HFA/MLC for covers)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Indemnification Agreement *</strong>
                    <p className="text-sm text-white/80">Agree to indemnify platform against copyright claims</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. File Requirements</h2>
<<<<<<< HEAD

              <h3 className="text-xl font-bold mt-4 mb-2">
                2.1 Audio File Formats
              </h3>
              <div className="bg-spotify-dark-gray rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-spotify-green mb-2">
                      Preferred Formats (Lossless):
                    </p>
=======
              
              <h3 className="text-xl font-bold mt-4 mb-2">2.1 Audio File Formats</h3>
              <div className="bg-spotify-dark-gray rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-spotify-green mb-2">Preferred Formats (Lossless):</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-white/80">
                      <li>WAV (Lossless, recommended)</li>
                      <li>FLAC (Lossless, compressed)</li>
                    </ul>
                  </div>
                  <div>
<<<<<<< HEAD
                    <p className="font-bold text-spotify-green mb-2">
                      Accepted Formats (Compressed):
                    </p>
=======
                    <p className="font-bold text-spotify-green mb-2">Accepted Formats (Compressed):</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-white/80">
                      <li>MP3 (320kbps minimum, preferred)</li>
                      <li>MP3 (192kbps minimum acceptable)</li>
                      <li>M4A/AAC (Apple Lossless supported)</li>
                      <li>MP4 (audio-only)</li>
                    </ul>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <h3 className="text-xl font-bold mt-4 mb-2">
                2.2 Cover Art Requirements
              </h3>
              <div className="bg-spotify-dark-gray rounded-lg p-4">
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-white/80">
                  <li>
                    <strong>Minimum Size:</strong> 1400x1400px (required)
                  </li>
                  <li>
                    <strong>Recommended Size:</strong> 3000x3000px (for best
                    quality)
                  </li>
                  <li>
                    <strong>Format:</strong> JPEG or PNG
                  </li>
                  <li>
                    <strong>Aspect Ratio:</strong> Square (1:1)
                  </li>
                  <li>
                    <strong>Color Space:</strong> RGB
                  </li>
                  <li>
                    <strong>File Size:</strong> Maximum 10MB
                  </li>
=======
              <h3 className="text-xl font-bold mt-4 mb-2">2.2 Cover Art Requirements</h3>
              <div className="bg-spotify-dark-gray rounded-lg p-4">
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-white/80">
                  <li><strong>Minimum Size:</strong> 1400x1400px (required)</li>
                  <li><strong>Recommended Size:</strong> 3000x3000px (for best quality)</li>
                  <li><strong>Format:</strong> JPEG or PNG</li>
                  <li><strong>Aspect Ratio:</strong> Square (1:1)</li>
                  <li><strong>Color Space:</strong> RGB</li>
                  <li><strong>File Size:</strong> Maximum 10MB</li>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. What's NOT Allowed</h2>
              <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
<<<<<<< HEAD
                  <XCircle
                    size={20}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-red-400">
                      Copyrighted Content Without Licenses
                    </strong>
                    <p className="text-sm text-white/80">
                      Covers, samples, or interpolations without mechanical
                      licenses or clearance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle
                    size={20}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-red-400">
                      Incomplete Metadata
                    </strong>
                    <p className="text-sm text-white/80">
                      Missing required fields (composers, ownership percentages,
                      legal warranties)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle
                    size={20}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-red-400">False Declarations</strong>
                    <p className="text-sm text-white/80">
                      Misrepresenting ownership, rights, or metadata accuracy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle
                    size={20}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-red-400">
                      Illegal or Offensive Content
                    </strong>
                    <p className="text-sm text-white/80">
                      Content that violates laws, contains hate speech, or is
                      otherwise offensive
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle
                    size={20}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-red-400">Low-Quality Audio</strong>
                    <p className="text-sm text-white/80">
                      Audio below 192kbps MP3 or corrupted files
                    </p>
=======
                  <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-400">Copyrighted Content Without Licenses</strong>
                    <p className="text-sm text-white/80">Covers, samples, or interpolations without mechanical licenses or clearance</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-400">Incomplete Metadata</strong>
                    <p className="text-sm text-white/80">Missing required fields (composers, ownership percentages, legal warranties)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-400">False Declarations</strong>
                    <p className="text-sm text-white/80">Misrepresenting ownership, rights, or metadata accuracy</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-400">Illegal or Offensive Content</strong>
                    <p className="text-sm text-white/80">Content that violates laws, contains hate speech, or is otherwise offensive</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-red-400">Low-Quality Audio</strong>
                    <p className="text-sm text-white/80">Audio below 192kbps MP3 or corrupted files</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Best Practices</h2>
              <div className="bg-spotify-dark-gray rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
<<<<<<< HEAD
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">Use Full Legal Names</strong>
                    <p className="text-sm text-white/80">
                      Provide full legal first and last names (not nicknames)
                      for PRO matching
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Provide IPI/CAE Numbers
                    </strong>
                    <p className="text-sm text-white/80">
                      Including IPI/CAE numbers from PROs speeds up royalty
                      matching and payouts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Use Lossless Formats When Possible
                    </strong>
                    <p className="text-sm text-white/80">
                      WAV or FLAC files provide the best audio quality for
                      listeners
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={20}
                    className="text-spotify-green flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <strong className="text-white">
                      Register with a PRO Before Uploading
                    </strong>
                    <p className="text-sm text-white/80">
                      Register with ASCAP, BMI, or SESAC to collect performance
                      royalties from day one. See our{" "}
                      <Link
                        href="/legal/pro-guide"
                        className="text-spotify-green hover:underline"
                      >
                        PRO Registration Guide
                      </Link>
                      .
                    </p>
=======
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Use Full Legal Names</strong>
                    <p className="text-sm text-white/80">Provide full legal first and last names (not nicknames) for PRO matching</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Provide IPI/CAE Numbers</strong>
                    <p className="text-sm text-white/80">Including IPI/CAE numbers from PROs speeds up royalty matching and payouts</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Use Lossless Formats When Possible</strong>
                    <p className="text-sm text-white/80">WAV or FLAC files provide the best audio quality for listeners</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Register with a PRO Before Uploading</strong>
                    <p className="text-sm text-white/80">Register with ASCAP, BMI, or SESAC to collect performance royalties from day one. 
                    See our <Link href="/legal/pro-guide" className="text-spotify-green hover:underline">PRO Registration Guide</Link>.</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </div>
                </div>
              </div>
            </section>

            <section>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold mb-4">
                5. What Happens After Upload?
              </h2>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong>Automatic Validation:</strong> System validates file
                  formats, metadata completeness, and ownership percentages
                </li>
                <li>
                  <strong>Content ID Scan:</strong> Audio is scanned for
                  copyright infringement and matched against licensed repertory
                </li>
                <li>
                  <strong>Review Process:</strong> Content is reviewed for
                  compliance before distribution (typically 24-48 hours)
                </li>
                <li>
                  <strong>Approval:</strong> If approved, content is distributed
                  and royalties begin accruing immediately
                </li>
                <li>
                  <strong>Rejection:</strong> If rejected, you'll receive
                  notification with reason (missing metadata, copyright issues,
                  etc.)
=======
              <h2 className="text-2xl font-bold mb-4">5. What Happens After Upload?</h2>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>
                  <strong>Automatic Validation:</strong> System validates file formats, metadata completeness, and ownership percentages
                </li>
                <li>
                  <strong>Content ID Scan:</strong> Audio is scanned for copyright infringement and matched against licensed repertory
                </li>
                <li>
                  <strong>Review Process:</strong> Content is reviewed for compliance before distribution (typically 24-48 hours)
                </li>
                <li>
                  <strong>Approval:</strong> If approved, content is distributed and royalties begin accruing immediately
                </li>
                <li>
                  <strong>Rejection:</strong> If rejected, you'll receive notification with reason (missing metadata, copyright issues, etc.)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </li>
              </ol>
            </section>

            <section>
<<<<<<< HEAD
              <h2 className="text-2xl font-bold mb-4">
                6. Additional Resources
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <Link
                    href="/legal/pro-guide"
                    className="text-spotify-green hover:underline"
                  >
                    PRO Registration Guide
                  </Link>{" "}
                  - How to register with ASCAP, BMI, SESAC, or GMR
                </li>
                <li>
                  <Link
                    href="/legal/royalty-policy"
                    className="text-spotify-green hover:underline"
                  >
                    Royalty Policy
                  </Link>{" "}
                  - How royalties work and payout terms
                </li>
                <li>
                  <Link
                    href="/legal/terms"
                    className="text-spotify-green hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  - Complete legal terms and conditions
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-spotify-green hover:underline"
                  >
                    Support
                  </Link>{" "}
                  - Contact support for upload questions
=======
              <h2 className="text-2xl font-bold mb-4">6. Additional Resources</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <Link href="/legal/pro-guide" className="text-spotify-green hover:underline">
                    PRO Registration Guide
                  </Link> - How to register with ASCAP, BMI, SESAC, or GMR
                </li>
                <li>
                  <Link href="/legal/royalty-policy" className="text-spotify-green hover:underline">
                    Royalty Policy
                  </Link> - How royalties work and payout terms
                </li>
                <li>
                  <Link href="/legal/terms" className="text-spotify-green hover:underline">
                    Terms of Service
                  </Link> - Complete legal terms and conditions
                </li>
                <li>
                  <Link href="/support" className="text-spotify-green hover:underline">
                    Support
                  </Link> - Contact support for upload questions
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
