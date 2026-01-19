'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore, ArtistType } from '@/stores/userStore';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Mail, Lock, Eye, EyeOff, User, Music, Users, Disc, Headphones, Radio, Briefcase, AlertCircle, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const artistTypeOptions: { value: ArtistType; label: string; icon: typeof Music; description: string }[] = [
  { value: 'solo', label: 'Solo Artist', icon: Music, description: 'Individual performer' },
  { value: 'band', label: 'Band/Group', icon: Users, description: 'Musical group or collective' },
  { value: 'producer', label: 'Producer', icon: Disc, description: 'Music producer or beatmaker' },
  { value: 'composer', label: 'Composer', icon: Headphones, description: 'Music composer' },
  { value: 'dj', label: 'DJ', icon: Radio, description: 'Disc jockey' },
];

export default function SignUpPage() {
  const router = useRouter();
  const { signup, isAuthenticated, isLoading } = useUserStore();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedArtistTypes, setSelectedArtistTypes] = useState<ArtistType[]>([]);
  const [isManagement, setIsManagement] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleArtistTypeToggle = (type: ArtistType) => {
    setSelectedArtistTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setErrors({});
    
    const hasArtistSelection = selectedArtistTypes.length > 0 || isManagement;
    
    const result = await signup(
      email, 
      password, 
      name,
      selectedArtistTypes.length > 0 ? selectedArtistTypes : undefined,
      isManagement || undefined
    );
    
    if (result.success) {
      if (hasArtistSelection) {
        // Redirect to artist verification/upload proof page
        router.push('/artist/verification');
      } else {
        // Regular signup - go to home
        router.push('/');
      }
    } else {
      setErrors({ general: result.error || 'Signup failed' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-spotify-green transition-colors">
            <Music size={32} className="text-spotify-green" />
            <span className="text-2xl font-bold">EmPulse Music</span>
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((s) => (
              <>
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all',
                    s === step
                      ? 'bg-spotify-green text-black scale-110'
                      : s < step
                      ? 'bg-spotify-green/50 text-white'
                      : 'bg-spotify-light-gray text-spotify-text-gray'
                  )}
                >
                  {s < step ? <Check size={20} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={cn(
                      'h-1 w-16 transition-colors',
                      s < step ? 'bg-spotify-green' : 'bg-spotify-light-gray'
                    )}
                  />
                )}
              </>
            ))}
          </div>
          <div className="flex justify-center gap-16 text-xs text-spotify-text-gray">
            <span className={step === 1 ? 'text-white font-medium' : ''}>Account</span>
            <span className={step === 2 ? 'text-white font-medium' : ''}>Artist Type</span>
            <span className={step === 3 ? 'text-white font-medium' : ''}>Review</span>
          </div>
        </div>

        {/* Sign Up Card */}
        <div className="bg-spotify-dark-gray rounded-lg p-8 shadow-2xl">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <>
              <h1 className="text-3xl font-bold mb-2 text-center">Create your account</h1>
              <p className="text-spotify-text-gray text-center mb-8">
                Start your musical journey with EmPulse Music
              </p>

              {errors.general && (
                <div 
                  className="mb-6 p-4 bg-empulse-red/10 border border-empulse-red/50 rounded-lg flex items-start gap-3"
                  role="alert"
                >
                  <AlertCircle size={20} className="text-empulse-red flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-empulse-red">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleStep1Continue} className="space-y-6">
                <Input
                  type="text"
                  label="Display name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  error={errors.name}
                  iconLeft={User}
                  required
                  disabled={isSubmitting}
                  autoComplete="name"
                />

                <Input
                  type="email"
                  label="Email address"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  error={errors.email}
                  iconLeft={Mail}
                  required
                  disabled={isSubmitting}
                  autoComplete="email"
                />

                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: '' });
                  }}
                  error={errors.password}
                  iconLeft={Lock}
                  iconRight={showPassword ? EyeOff : Eye}
                  onIconRightClick={() => setShowPassword(!showPassword)}
                  helperText="Must be at least 8 characters with uppercase, lowercase, and number"
                  required
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />

                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                  }}
                  error={errors.confirmPassword}
                  iconLeft={Lock}
                  iconRight={showConfirmPassword ? EyeOff : Eye}
                  onIconRightClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  required
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Continue
                </Button>
              </form>
            </>
          )}

          {/* Step 2: Artist Type Selection (Optional) */}
          {step === 2 && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-center">Are you an artist or manager?</h2>
              <p className="text-spotify-text-gray text-center mb-8">
                Select your artist type(s) or skip to create a regular account. You can add this later.
              </p>

              <div className="space-y-4 mb-6">
                {/* Management Option */}
                <div
                  onClick={() => setIsManagement(!isManagement)}
                  className={cn(
                    'p-4 rounded-lg border-2 cursor-pointer transition-all',
                    isManagement
                      ? 'border-spotify-green bg-spotify-green/10'
                      : 'border-spotify-light-gray bg-spotify-dark-gray hover:border-white/20'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0',
                      isManagement ? 'border-spotify-green bg-spotify-green' : 'border-white/30'
                    )}>
                      {isManagement && <Check size={16} className="text-black" />}
                    </div>
                    <Briefcase size={24} className={isManagement ? 'text-spotify-green' : 'text-spotify-text-gray'} />
                    <div className="flex-1">
                      <div className="font-medium text-white">Management/Label</div>
                      <div className="text-sm text-spotify-text-gray">I manage artists or represent a label</div>
                    </div>
                  </div>
                </div>

                {/* Artist Types */}
                {artistTypeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedArtistTypes.includes(option.value);
                  
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleArtistTypeToggle(option.value)}
                      className={cn(
                        'p-4 rounded-lg border-2 cursor-pointer transition-all',
                        isSelected
                          ? 'border-spotify-green bg-spotify-green/10'
                          : 'border-spotify-light-gray bg-spotify-dark-gray hover:border-white/20'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0',
                          isSelected ? 'border-spotify-green bg-spotify-green' : 'border-white/30'
                        )}>
                          {isSelected && <Check size={16} className="text-black" />}
                        </div>
                        <Icon size={24} className={isSelected ? 'text-spotify-green' : 'text-spotify-text-gray'} />
                        <div className="flex-1">
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-sm text-spotify-text-gray">{option.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Info Box */}
              {(selectedArtistTypes.length > 0 || isManagement) && (
                <div className="mb-6 p-4 bg-blue-600/20 border border-blue-600/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium mb-1">Artist/Management Verification Required</p>
                      <p className="text-xs text-white/80">
                        After signup, you&apos;ll need to submit proof of your artist/management status. 
                        This requires admin approval before you can access artist features. 
                        Your free account will be created immediately.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    if (selectedArtistTypes.length > 0 || isManagement) {
                      setStep(3);
                    } else {
                      // Skip to signup without artist type
                      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                    }
                  }}
                  className="flex-1"
                >
                  {selectedArtistTypes.length > 0 || isManagement ? 'Continue' : 'Skip & Sign Up'}
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <>
              <h2 className="text-3xl font-bold mb-2 text-center">Review your information</h2>
              <p className="text-spotify-text-gray text-center mb-8">
                Please review and confirm your details
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-spotify-light-gray rounded-lg p-6 space-y-4">
                  <div>
                    <div className="text-sm text-spotify-text-gray mb-1">Name</div>
                    <div className="text-white font-medium">{name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-spotify-text-gray mb-1">Email</div>
                    <div className="text-white font-medium">{email}</div>
                  </div>
                  {(selectedArtistTypes.length > 0 || isManagement) && (
                    <div>
                      <div className="text-sm text-spotify-text-gray mb-2">Artist/Management Type</div>
                      <div className="flex flex-wrap gap-2">
                        {isManagement && (
                          <span className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm">
                            Management/Label
                          </span>
                        )}
                        {selectedArtistTypes.map(type => {
                          const option = artistTypeOptions.find(o => o.value === type);
                          return (
                            <span key={type} className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-sm">
                              {option?.label || type}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms Agreement */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 rounded border-white/30 bg-transparent text-spotify-green focus:ring-spotify-green"
                  />
                  <span className="text-sm text-white">
                    I agree to the{' '}
                    <Link href="/legal/terms" className="text-spotify-green hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/legal/privacy" className="text-spotify-green hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isSubmitting || isLoading}
                    disabled={isSubmitting || isLoading}
                    className="flex-1"
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            </>
          )}

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-spotify-text-gray text-sm">
              Already have an account?{' '}
              <Link 
                href="/signin"
                className="text-spotify-green hover:text-spotify-green/80 hover:underline font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-spotify-text-gray">
          <div className="flex justify-center gap-6">
            <Link href="/legal/privacy" className="hover:text-white hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="hover:text-white hover:underline transition-colors">
              Terms of Service
            </Link>
            <Link href="/help" className="hover:text-white hover:underline transition-colors">
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
