import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormState {
  announcer: string;
  setAnnouncer: (announcer: string) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      announcer: "",
      setAnnouncer: (announcer: string) => set({ announcer }),
    }),
    {
      name: "form-storage", // Key for storing in localStorage
      getStorage: () => localStorage, // Use localStorage by default
    }
  )
);
