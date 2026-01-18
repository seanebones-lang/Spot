'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft, Sparkles, Heart, Music, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface OnboardingTourProps {
  onComplete: () => void;
}

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    id: 'check-in',
    title: 'Daily Mood Check-in',
    description: 'Track your mood daily and earn points. Build streaks to unlock rewards and badges.',
    icon: <Heart size={24} className="text-empulse-purple" />,
    target: '[data-tour="check-in"]',
    position: 'bottom',
  },
  {
    id: 'mood-discovery',
    title: 'Mood-Based Music Discovery',
    description: 'Find music that matches your current mood. Our 4-dimensional mood system helps you discover perfect tracks.',
    icon: <Music size={24} className="text-empulse-blue" />,
    target: '[data-tour="mood-matcher"]',
    position: 'bottom',
  },
  {
    id: 'points',
    title: 'Earn Points & Rewards',
    description: 'Complete daily check-ins, listen to music, and build streaks to earn points. Redeem them for rewards!',
    icon: <Award size={24} className="text-empulse-blue" />,
    target: '[data-tour="points"]',
    position: 'left',
  },
  {
    id: 'keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    description: 'Press Ctrl+K to search, Ctrl+/ for shortcuts, and Space to play/pause. Speed up your workflow!',
    icon: <Sparkles size={24} className="text-spotify-green" />,
    target: '[data-tour="keyboard-shortcuts"]',
    position: 'left',
  },
];

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed');
    if (completed === 'true') {
      setIsComplete(true);
    }
  }, []);

  const handleStartTour = () => {
    setShowWelcome(false);
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      scrollToTarget(tourSteps[0]?.target);
    }, 100);
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // Small delay to ensure DOM is ready and element exists
      setTimeout(() => {
        scrollToTarget(tourSteps[nextStep]?.target);
      }, 100);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollToTarget(tourSteps[prevStep]?.target);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsComplete(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const scrollToTarget = (selector?: string) => {
    if (!selector) return;
    // Try multiple times in case element isn't rendered yet
    let attempts = 0;
    const maxAttempts = 10;
    const tryScroll = () => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  };

  const currentTourStep = tourSteps[currentStep];

  // Don't render if already completed
  if (isComplete) return null;

  // Welcome Modal
  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4">
        <div className="bg-spotify-dark-gray rounded-lg w-full max-w-md shadow-2xl">
          <div className="p-8 text-center">
            <div className="mb-6">
              <Sparkles size={48} className="text-empulse-purple mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Welcome to EmPulse Music! 🎵</h2>
              <p className="text-spotify-text-gray">
                Discover music that matches your mood
              </p>
            </div>

            <div className="space-y-3 mb-8 text-left">
              <div className="flex items-start gap-3">
                <Heart size={20} className="text-empulse-purple flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Track your mood daily</div>
                  <div className="text-sm text-spotify-text-gray">Earn points and build streaks</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Music size={20} className="text-empulse-blue flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Mood-based discovery</div>
                  <div className="text-sm text-spotify-text-gray">Find music for every feeling</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award size={20} className="text-spotify-green flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Earn rewards</div>
                  <div className="text-sm text-spotify-text-gray">Redeem points for exclusive perks</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="flex-1 px-6 py-3 rounded-full bg-transparent border border-white/20 text-white hover:bg-white/10 transition-colors font-medium"
              >
                Skip Tour
              </button>
              <button
                onClick={handleStartTour}
                className="flex-1 px-6 py-3 rounded-full bg-spotify-green text-black hover:scale-105 transition-transform font-bold"
              >
                Start Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tour Steps
  return (
    <>
      {/* Overlay with spotlight */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 z-[199] pointer-events-none"
        style={{
          clipPath: currentTourStep?.target
            ? `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)`
            : undefined,
        }}
      />

      {/* Tour Tooltip */}
      {currentTourStep && (() => {
        const targetElement = currentTourStep.target ? document.querySelector(currentTourStep.target) : null;
        // Only show tooltip if target element exists or if no target specified
        if (!currentTourStep.target || targetElement) {
          return (
            <div
              className={cn(
                'fixed z-[201] bg-spotify-dark-gray rounded-lg shadow-2xl p-6 max-w-sm',
                'border border-white/20',
                getTooltipPosition(currentTourStep.position)
              )}
              style={getTooltipStyle(currentTourStep.target, currentTourStep.position)}
            >
          <div className="flex items-start gap-4 mb-4">
            {currentTourStep.icon}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{currentTourStep.title}</h3>
              <p className="text-sm text-spotify-text-gray">
                {currentTourStep.description}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-spotify-text-gray hover:text-white transition-colors"
              aria-label="Close tour"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-spotify-text-gray">
              Step {currentStep + 1} of {tourSteps.length}
            </div>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 rounded-full bg-spotify-light-gray hover:bg-spotify-light-gray/80 text-white transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>
              )}
              <button
                onClick={currentStep < tourSteps.length - 1 ? handleNext : handleComplete}
                className="px-4 py-2 rounded-full bg-spotify-green text-black hover:scale-105 transition-transform font-medium flex items-center gap-2"
              >
                {currentStep < tourSteps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight size={16} />
                  </>
                ) : (
                  'Get Started'
                )}
              </button>
            </div>
          </div>
        </div>
          );
        }
        return null;
      })()}
    </>
  );
}

function getTooltipPosition(position?: string) {
  switch (position) {
    case 'top':
      return 'bottom-4';
    case 'bottom':
      return 'top-4';
    case 'left':
      return 'right-4';
    case 'right':
      return 'left-4';
    default:
      return 'top-4';
  }
}

function getTooltipStyle(target?: string, position?: string): React.CSSProperties {
  // Simple positioning - in production, use a library like react-floater or popper.js
  const element = target ? document.querySelector(target) : null;
  if (!element) {
    return { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  }

  const rect = element.getBoundingClientRect();
  const offset = 16;

  switch (position) {
    case 'top':
      return {
        position: 'fixed',
        top: `${rect.top - offset}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: 'translate(-50%, -100%)',
      };
    case 'bottom':
      return {
        position: 'fixed',
        top: `${rect.bottom + offset}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: 'translateX(-50%)',
      };
    case 'left':
      return {
        position: 'fixed',
        top: `${rect.top + rect.height / 2}px`,
        left: `${rect.left - offset}px`,
        transform: 'translate(-100%, -50%)',
      };
    case 'right':
      return {
        position: 'fixed',
        top: `${rect.top + rect.height / 2}px`,
        left: `${rect.right + offset}px`,
        transform: 'translateY(-50%)',
      };
    default:
      return {
        position: 'fixed',
        top: `${rect.bottom + offset}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: 'translateX(-50%)',
      };
  }
}
