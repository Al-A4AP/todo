import { create } from "zustand";

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  isAuthenticated: false,
  signIn: (email: string) => set({ email, isAuthenticated: true }),
  signOut: () => set({ email: null, isAuthenticated: false }),
}));
