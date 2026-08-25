import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      userName:"Usman khan",

      login: (name) => set({ isLoggedIn: true,userName:name }),

      logout: () => set({ isLoggedIn: false,userName:"" }),
    }),
    {
      name: "auth-storage",
    }
  )
);