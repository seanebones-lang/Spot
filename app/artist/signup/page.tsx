'use client';

import { useState } from 'react';
import { useArtistSignupStore } from '@/stores/artistSignupStore';
import { Check, FileText, Download, AlertCircle, Music, Mic, BookOpen, Radio } from 'lucide-react';

const legalDocuments = [
  { id: 'artist-agreement', name: 'Artist Agreement', required: true },
  { id: 'payment-terms', name: 'Payment Terms & Conditions', required: true },
  { id: 'ip-rights', name: 'Intellectual Property Rights Agreement', required: true },
  { id: 'revenue-share', name: 'Revenue Share Agreement', required: true },
  { id: 'terms-of-service', name: 'Platform Terms of Service (Artist)', required: true },
];

const mediumOptions = [
  { id: 'artist' as const, label: 'Musician/Artist', icon: Music, description: 'Upload tracks, albums, EPs, and LPs' },
  { id: 'podcaster' as const, label: 'Podcaster', icon: Mic, description: 'Upload and manage podcast episodes' },
  { id: 'audiobook' as const, label: 'Audiobook Creator', icon: BookOpen, description: 'Upload and distribute audiobooks' },
  { id: 'radio' as const, label: 'Radio Station Host', icon: Radio, description: 'Manage radio station content' },
];

export default function ArtistSignupPage() {
  const {
    currentStep,
    selectedMediums,
    documentsSigned,
    w9Completed,
    proRegistration,
    approvalStatus,
    setCurrentStep,
    toggleMedium,
    markDocumentSigned,
    setW9Completed,
    setPRORegistration,
    setApprovalStatus,
  } = useArtistSignupStore();

  const [w9Data, setW9Data] = useState({
    ssn: '',
    ein: '',
    businessName: '',
    address: '',
    taxClassification: '',
    completed: false,
  });
  const [digitalSignature, setDigitalSignature] = useState('');
  const [accountInfo, setAccountInfo] = useState({
    artistName: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const allDocumentsSigned = legalDocuments.every(doc => documentsSigned.includes(doc.id));

  const handleSubmit = async () => {
    if (!allDocumentsSigned || !w9Completed || !digitalSignature.trim()) {
      setSubmitError('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Get auth token from store (user should be logged in)
      const token = localStorage.getItem('auth-storage');
      let authToken = null;
      if (token) {
        try {
          const authData = JSON.parse(token);
          authToken = authData?.state?.token;
        } catch (e) {
          // Token not found
        }
      }

      if (!authToken) {
        setSubmitError('Please log in to submit your application');
        setIsSubmitting(false);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = apiUrl ? `${apiUrl}/api/artist/signup` : '/api/artist/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          selectedMediums,
          accountInfo,
          documentsSigned,
          w9Data: {
            ...w9Data,
            taxId: w9Data.ssn || w9Data.ein,
            completed: w9Completed,
          },
          proRegistration,
          digitalSignature,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      // Success - update approval status
      setApprovalStatus('pending');
      setCurrentStep(7);
    } catch (error) {
      console.error('Signup submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Artist Signup - Legal Compliance</h1>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step <= currentStep
                    ? 'bg-spotify-green text-black'
                    : 'bg-spotify-light-gray text-spotify-text-gray'
                }`}
              >
                {step < currentStep ? <Check size={20} /> : step}
              </div>
              {step < 7 && (
                <div
                  className={`w-16 h-1 mx-1 ${
                    step < currentStep ? 'bg-spotify-green' : 'bg-spotify-light-gray'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-spotify-text-gray">
          <span>Mediums</span>
          <span>Account</span>
          <span>Documents</span>
          <span>Tax Forms</span>
          <span>PRO</span>
          <span>Sign</span>
          <span>Approval</span>
        </div>
      </div>

      {/* Step 1: Medium Selection */}
      {currentStep === 1 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 1: Select Your Creator Mediums</h2>
          <p className="text-sm text-white/80 mb-6">
            Select all the mediums you want to create content for. You can select multiple options.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {mediumOptions.map((medium) => {
              const Icon = medium.icon;
              const isSelected = selectedMediums.includes(medium.id);
              return (
                <button
                  key={medium.id}
                  onClick={() => toggleMedium(medium.id)}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? 'border-spotify-green bg-spotify-green/10'
                      : 'border-spotify-light-gray bg-spotify-dark-gray hover:border-white/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isSelected ? 'bg-spotify-green/20' : 'bg-spotify-light-gray'
                    }`}>
                      <Icon 
                        size={32} 
                        className={isSelected ? 'text-spotify-green' : 'text-spotify-text-gray'} 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">{medium.label}</h3>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'border-spotify-green bg-spotify-green' 
                            : 'border-spotify-text-gray bg-transparent'
                        }`}>
                          {isSelected && <Check size={14} className="text-black" />}
                        </div>
                      </div>
                      <p className="text-sm text-spotify-text-gray">{medium.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedMediums.length === 0 && (
            <div className="mb-6 p-4 bg-yellow-600/20 border border-yellow-600/50 rounded-lg">
              <p className="text-sm text-white/80">
                <strong className="text-yellow-500">Please select at least one medium</strong> to continue.
              </p>
            </div>
          )}

          <button
            onClick={() => setCurrentStep(2)}
            disabled={selectedMediums.length === 0}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Account Creation
          </button>
        </div>
      )}

      {/* Step 2: Account Creation */}
      {currentStep === 2 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 2: Account Creation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Artist/Management Name</label>
              <input
                type="text"
                value={accountInfo.artistName}
                onChange={(e) => setAccountInfo({ ...accountInfo, artistName: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="Enter artist or management name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={accountInfo.email}
                onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="your@email.com"
                required
              />
              <p className="text-xs text-spotify-text-gray mt-1">Verification required</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={accountInfo.password}
                onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="Create a strong password"
                minLength={8}
                required
              />
              <p className="text-xs text-spotify-text-gray mt-1">Must be at least 8 characters</p>
            </div>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={!accountInfo.artistName || !accountInfo.email || !accountInfo.password || accountInfo.password.length < 8}
              className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Legal Documents
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Legal Document Review */}
      {currentStep === 3 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 2: Legal Document Review</h2>
          <div className="mb-6">
            <AlertCircle className="text-yellow-500 mb-2" size={24} />
            <p className="text-sm text-white/80 mb-4">
              Please review all legal documents carefully. You must scroll through each document and download/read before signing.
            </p>
          </div>
          
          <div className="space-y-3 mb-6">
            {legalDocuments.map((doc) => {
              const isSigned = documentsSigned.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  className={`p-4 rounded-lg border-2 ${
                    isSigned
                      ? 'border-spotify-green bg-spotify-green/10'
                      : 'border-spotify-light-gray bg-spotify-dark-gray'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={24} className={isSigned ? 'text-spotify-green' : 'text-spotify-text-gray'} />
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        {doc.required && (
                          <span className="text-xs text-red-400">Required</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-spotify-green hover:underline text-sm flex items-center gap-1">
                        <Download size={16} />
                        Download PDF
                      </button>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSigned}
                          onChange={(e) => {
                            if (e.target.checked) {
                              markDocumentSigned(doc.id);
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">I&apos;ve read and agree</span>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-6 bg-blue-600/20 border border-blue-600/50 rounded-lg p-4">
            <h3 className="font-bold mb-2">Performance Rights Organizations (PRO) Guidance</h3>
            <p className="text-sm text-white/80 mb-2">
              You should register with a PRO (BMI, ASCAP, or SESAC) to collect performance royalties. Download our PRO guide:
            </p>
            <button className="text-blue-400 hover:underline text-sm flex items-center gap-1">
              <Download size={16} />
              Download PRO Guidance PDF
            </button>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setCurrentStep(2)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              disabled={!allDocumentsSigned}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Tax Documentation
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Tax Documentation (W-9) */}
      {currentStep === 4 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 3: Tax Documentation</h2>
          <p className="text-sm text-white/80 mb-6">
            Complete the W-9 form (or equivalent for international artists) for tax reporting purposes.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Tax Identification Number (SSN or EIN) *
              </label>
              <input
                type="text"
                value={w9Data.ssn || w9Data.ein}
                onChange={(e) => setW9Data({ ...w9Data, ssn: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="123-45-6789 or 12-3456789"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Business Name/Legal Entity</label>
              <input
                type="text"
                value={w9Data.businessName}
                onChange={(e) => setW9Data({ ...w9Data, businessName: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                placeholder="If different from artist name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address *</label>
              <textarea
                value={w9Data.address}
                onChange={(e) => setW9Data({ ...w9Data, address: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green min-h-20"
                placeholder="Street address, City, State, ZIP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tax Classification *</label>
              <select
                value={w9Data.taxClassification}
                onChange={(e) => setW9Data({ ...w9Data, taxClassification: e.target.value })}
                className="w-full bg-spotify-dark-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
              >
                <option value="">Select classification</option>
                <option value="individual">Individual/sole proprietor</option>
                <option value="llc">LLC (single-member)</option>
                <option value="llc-partnership">LLC (partnership)</option>
                <option value="corporation">Corporation</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>
          </div>

          <div className="mb-6 p-4 bg-yellow-600/20 border border-yellow-600/50 rounded-lg">
            <p className="text-sm text-white/80">
              <strong className="text-yellow-500">Note:</strong> This information is required for tax reporting and will be kept secure and confidential.
            </p>
          </div>

          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={w9Completed}
              onChange={(e) => setW9Completed(e.target.checked)}
              className="mt-1 rounded"
            />
            <span className="text-sm">
              I certify that the information provided is correct and complete. I understand that this is a legally binding document.
            </span>
          </label>

          <div className="flex gap-4">
            <button onClick={() => setCurrentStep(3)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              disabled={!w9Completed || !w9Data.address || !w9Data.taxClassification}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to PRO Registration
            </button>
          </div>
        </div>
      )}

      {/* Step 5: PRO Registration */}
      {currentStep === 5 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 4: PRO Registration</h2>
          <p className="text-sm text-white/80 mb-6">
            Register with a Performance Rights Organization (BMI, ASCAP, or SESAC) to collect performance royalties.
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <h3 className="font-medium mb-2">BMI Registration</h3>
              <input
                type="text"
                value={proRegistration.bmi || ''}
                onChange={(e) => setPRORegistration('bmi', e.target.value || null)}
                className="w-full bg-spotify-light-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green mt-2"
                placeholder="BMI Registration Number (if already registered)"
              />
              <a href="https://www.bmi.com" target="_blank" rel="noopener noreferrer" className="text-spotify-green hover:underline text-sm mt-2 inline-block">
                Register with BMI →
              </a>
            </div>

            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <h3 className="font-medium mb-2">ASCAP Registration</h3>
              <input
                type="text"
                value={proRegistration.ascap || ''}
                onChange={(e) => setPRORegistration('ascap', e.target.value || null)}
                className="w-full bg-spotify-light-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green mt-2"
                placeholder="ASCAP Registration Number (if already registered)"
              />
              <a href="https://www.ascap.com" target="_blank" rel="noopener noreferrer" className="text-spotify-green hover:underline text-sm mt-2 inline-block">
                Register with ASCAP →
              </a>
            </div>

            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <h3 className="font-medium mb-2">SESAC Registration</h3>
              <input
                type="text"
                value={proRegistration.sesac || ''}
                onChange={(e) => setPRORegistration('sesac', e.target.value || null)}
                className="w-full bg-spotify-light-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green mt-2"
                placeholder="SESAC Registration Number (if already registered)"
              />
              <a href="https://www.sesac.com" target="_blank" rel="noopener noreferrer" className="text-spotify-green hover:underline text-sm mt-2 inline-block">
                Register with SESAC →
              </a>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-600/20 border border-blue-600/50 rounded-lg">
            <p className="text-sm text-white/80">
              <strong className="text-blue-400">Note:</strong> PRO registration is recommended but not required for signup. You can register later and update your information.
            </p>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setCurrentStep(4)} className="btn-secondary">
              Back
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="btn-primary flex-1"
            >
              Continue to Document Signing
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Document Signing */}
      {currentStep === 6 && (
        <div className="bg-spotify-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Step 6: Document Signing</h2>
          <p className="text-sm text-white/80 mb-6">
            Provide your digital signature to finalize the legally binding agreement.
          </p>

          <div className="mb-6 space-y-4">
            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <h3 className="font-medium mb-3">Final Agreement Confirmation</h3>
              <label className="flex items-start gap-3 mb-4 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded" />
                <span className="text-sm">
                  I understand this is a legally binding agreement. I have read and agree to all terms and conditions.
                </span>
              </label>
            </div>

            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <label className="block text-sm font-medium mb-2">Digital Signature</label>
              <input
                type="text"
                value={digitalSignature}
                onChange={(e) => setDigitalSignature(e.target.value)}
                className="w-full bg-spotify-light-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green border-b-2 border-white"
                placeholder="Type your full legal name"
                required
              />
              <p className="text-xs text-spotify-text-gray mt-1">By typing your name, you are providing a legally binding signature</p>
            </div>

            <div className="p-4 bg-spotify-dark-gray rounded-lg">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                className="w-full bg-spotify-light-gray rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-spotify-green"
                defaultValue={new Date().toISOString().split('T')[0]}
                readOnly
              />
            </div>
          </div>

          {submitError && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{submitError}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button onClick={() => setCurrentStep(5)} className="btn-secondary" disabled={isSubmitting}>
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!allDocumentsSigned || !w9Completed || !digitalSignature.trim() || isSubmitting}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </div>
        </div>
      )}

      {/* Step 7: Approval Pending */}
      {currentStep === 7 && (
        <div className="bg-spotify-light-gray rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={40} className="text-yellow-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {approvalStatus === 'pending' && 'Pending Approval'}
              {approvalStatus === 'under-review' && 'Under Review'}
              {approvalStatus === 'approved' && 'Approved!'}
              {approvalStatus === 'rejected' && 'Rejected'}
            </h2>
            <p className="text-spotify-text-gray mb-4">
              {approvalStatus === 'pending' && 'Your application has been submitted and is awaiting admin review.'}
              {approvalStatus === 'approved' && 'Congratulations! You can now upload content.'}
              {approvalStatus === 'rejected' && 'Your application was rejected. Please review the requirements and resubmit.'}
            </p>
            {selectedMediums.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-spotify-text-gray mb-2">Selected mediums:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedMediums.map((medium) => {
                    const option = mediumOptions.find(m => m.id === medium);
                    if (!option) return null;
                    const Icon = option.icon;
                    return (
                      <div
                        key={medium}
                        className="flex items-center gap-2 px-3 py-1.5 bg-spotify-green/20 rounded-full text-sm"
                      >
                        <Icon size={16} className="text-spotify-green" />
                        <span className="text-white">{option.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {approvalStatus === 'pending' && (
              <p className="text-sm text-spotify-text-gray mt-2">
                Estimated approval time: 24-48 hours
              </p>
            )}
          </div>
          
          {approvalStatus === 'approved' && (
            <button className="btn-primary">
              Go to Artist Dashboard
            </button>
          )}
        </div>
      )}
    </div>
  );
}
