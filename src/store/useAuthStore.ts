import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
}

const localStorageStore: PersistOptions<AuthState, AuthState>["storage"] = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => localStorage.removeItem(name),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (t) => set({ token: t }),
      logout: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
      storage: localStorageStore, 
    }
  )
);
