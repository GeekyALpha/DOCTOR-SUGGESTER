import { create } from 'zustand';
import { User, LoginCredentials, SignupCredentials } from '@/lib/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await delay(1000);
      
      // Mock validation
      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        const user: User = {
          id: '1',
          name: 'Test User',
          email: credentials.email,
        };
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false 
      });
    }
  },
  signup: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await delay(1000);
      
      const user: User = {
        id: '1',
        name: credentials.name,
        email: credentials.email,
      };
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false 
      });
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },
}));