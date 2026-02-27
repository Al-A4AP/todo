import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  // User Data -> Loading Error States -> D getter -> lanjut
  userId: string | null;
  email: string | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: () => boolean;
  signInAsync: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      userId: null,
      email: null,
      token: null,
      isLoading: false,
      error: null,

      // Derived getter - tdk lg redundant property
      isAuthenticated: () => {
        const state = get();
        return state.token !== null && state.userId !== null;
      },

      // Async signin dgn backend API
      signInAsync: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // simlt backend API call
          //Blm ada API endpoint
          const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
              errorData.message ||
                `Login failed with status ${response.status}`,
            );
          }

          const data = await response.json();
          const { userId, token } = data;

          set({
            userId,
            email,
            token,
            isLoading: false,
            error: null,
          });
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
          set({
            userId: null,
            email: null,
            token: null,
            isLoading: false,
            error: errorMessage,
          });
          throw err;
        }
      },

      // Sign out & clear all auth data
      signOut: () => {
        set({
          userId: null,
          email: null,
          token: null,
          isLoading: false,
          error: null,
        });
      },

      // Clear error message
      clearError: () => set({ error: null }),

      // Restore session from sessionStorage on app init
      restoreSession: async () => {
        set({ isLoading: true });
        try {
          // Verify token with backend if needed
          const state = get();
          if (state.token) {
            // Optional: validate token with backend
            // For now, just trust the stored session
            set({ isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (err) {
          set({
            userId: null,
            email: null,
            token: null,
            isLoading: false,
            error: "Session expired. Please sign in again.",
          });
        }
      },
    }),
    {
      name: "auth-store",

      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
