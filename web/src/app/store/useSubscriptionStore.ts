import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SubscriptionState {
  freeCredits: number;
  isPremium: boolean;
  decrementCredits: () => void;
  setPremium: (value: boolean) => void;
  resetCredits: () => void;
}

const FREE_TIER_CREDITS = 3;

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      freeCredits: FREE_TIER_CREDITS,
      isPremium: false,
      decrementCredits: () =>
        set((state) => ({ freeCredits: Math.max(0, state.freeCredits - 1) })),
      setPremium: (value) => set({ isPremium: value, freeCredits: FREE_TIER_CREDITS }),
      resetCredits: () => set({ freeCredits: FREE_TIER_CREDITS }),
    }),
    {
      name: 'subscription-storage',
    }
  )
);