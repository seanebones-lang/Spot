import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ApprovalStatus = 'pending' | 'under-review' | 'approved' | 'rejected';

interface ArtistSignupState {
  currentStep: number;
  approvalStatus: ApprovalStatus | null;
  documentsSigned: string[];
  w9Completed: boolean;
  proRegistration: {
    bmi: string | null;
    ascap: string | null;
    sesac: string | null;
  };
  setCurrentStep: (step: number) => void;
  markDocumentSigned: (docId: string) => void;
  setW9Completed: (completed: boolean) => void;
  setPRORegistration: (org: 'bmi' | 'ascap' | 'sesac', regNumber: string | null) => void;
  setApprovalStatus: (status: ApprovalStatus) => void;
}

export const useArtistSignupStore = create<ArtistSignupState>()(
  persist(
    (set) => ({
      currentStep: 1,
      approvalStatus: null,
      documentsSigned: [],
      w9Completed: false,
      proRegistration: {
        bmi: null,
        ascap: null,
        sesac: null,
      },
      
      setCurrentStep: (step) => set({ currentStep: step }),
      markDocumentSigned: (docId) => set((state) => ({
        documentsSigned: [...state.documentsSigned.filter(d => d !== docId), docId]
      })),
      setW9Completed: (completed) => set({ w9Completed: completed }),
      setPRORegistration: (org, regNumber) => set((state) => ({
        proRegistration: { ...state.proRegistration, [org]: regNumber }
      })),
      setApprovalStatus: (status) => set({ approvalStatus: status }),
    }),
    {
      name: 'artist-signup-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
