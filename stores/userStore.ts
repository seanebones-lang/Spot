import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserRole = 'user' | 'artist' | 'management';
export type SubscriptionTier = 'free' | 'premium' | 'artist';
export type ArtistType = 'solo' | 'band' | 'producer' | 'composer' | 'dj' | 'management';
export type ApprovalStatus = 'none' | 'pending' | 'under-review' | 'approved' | 'rejected';
export type PasswordResetStatus = 'none' | 'email-sent' | 'code-verified' | 'password-reset';

export interface ArtistApplication {
  types: ArtistType[];
  isManagement: boolean;
  proofDocuments: File[] | string[]; // File objects or URLs
  approvalStatus: ApprovalStatus;
  submittedAt?: Date;
  reviewedAt?: Date;
  rejectionReason?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: Date;
  subscriptionTier: SubscriptionTier;
  roles: UserRole[];
  artistApplication?: ArtistApplication;
  profilePicture?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  passwordResetStatus: PasswordResetStatus;
  resetEmail: string | null;
  resetCode: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, artistTypes?: ArtistType[], isManagement?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateSubscriptionTier: (tier: SubscriptionTier) => void;
  submitArtistApplication: (types: ArtistType[], isManagement: boolean, proofDocuments: File[]) => void;
  updateArtistApprovalStatus: (status: ApprovalStatus, rejectionReason?: string) => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyResetCode: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  clearPasswordReset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      passwordResetStatus: 'none',
      resetEmail: null,
      resetCode: null,

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),

      login: async (email, password) => {
        set({ isLoading: true });
        
        try {
          // TODO: Replace with actual API call
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            emailVerified: true,
            createdAt: new Date(),
            subscriptionTier: 'free',
            roles: ['user'],
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Login failed' 
          };
        }
      },

      signup: async (email, password, name, artistTypes, isManagement) => {
        set({ isLoading: true });
        
        try {
          // TODO: Replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user: User = {
            id: Date.now().toString(),
            email,
            name,
            emailVerified: false,
            createdAt: new Date(),
            subscriptionTier: 'free',
            roles: ['user'],
            artistApplication: (artistTypes && artistTypes.length > 0) || isManagement ? {
              types: artistTypes || [],
              isManagement: isManagement || false,
              proofDocuments: [],
              approvalStatus: 'pending',
              submittedAt: new Date(),
            } : undefined,
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Signup failed' 
          };
        }
      },

      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),

      updateSubscriptionTier: (tier) => set((state) => ({
        user: state.user ? { ...state.user, subscriptionTier: tier } : null
      })),

      submitArtistApplication: (types, isManagement, proofDocuments) => set((state) => ({
        user: state.user ? {
          ...state.user,
          artistApplication: {
            types,
            isManagement,
            proofDocuments: proofDocuments.map(f => f instanceof File ? f.name : f),
            approvalStatus: 'pending',
            submittedAt: new Date(),
          },
        } : null
      })),

      updateArtistApprovalStatus: (status, rejectionReason) => set((state) => ({
        user: state.user && state.user.artistApplication ? {
          ...state.user,
          artistApplication: {
            ...state.user.artistApplication,
            approvalStatus: status,
            reviewedAt: new Date(),
            rejectionReason,
          },
        } : state.user
      })),

      requestPasswordReset: async (email) => {
        set({ isLoading: true });
        
        try {
          // TODO: Replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Generate mock reset code (in real app, this would be sent via email)
          const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
          
          set({ 
            passwordResetStatus: 'email-sent',
            resetEmail: email,
            resetCode: mockCode, // In real app, this would be stored server-side
            isLoading: false 
          });
          
          // Log code for testing (remove in production)
          console.log('🔐 Password reset code:', mockCode);
          
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to send reset email' 
          };
        }
      },

      verifyResetCode: async (email, code) => {
        set({ isLoading: true });
        
        try {
          // TODO: Replace with actual API call
          const state = get();
          
          if (state.resetEmail === email && state.resetCode === code) {
            set({ 
              passwordResetStatus: 'code-verified',
              isLoading: false 
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: 'Invalid reset code' };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Code verification failed' 
          };
        }
      },

      resetPassword: async (email, code, newPassword) => {
        set({ isLoading: true });
        
        try {
          // TODO: Replace with actual API call
          const state = get();
          
          if (state.resetEmail === email && state.resetCode === code) {
            // In real app, this would update password on server
            set({ 
              passwordResetStatus: 'password-reset',
              isLoading: false 
            });
            
            // Clear reset state after a delay
            setTimeout(() => {
              get().clearPasswordReset();
            }, 3000);
            
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: 'Invalid reset code' };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Password reset failed' 
          };
        }
      },

      clearPasswordReset: () => set({
        passwordResetStatus: 'none',
        resetEmail: null,
        resetCode: null,
      }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
