import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormState {
  announcer: string;
  setAnnouncer: (announcer: string) => void;
}

export const useFormStore = create<FormState>()(
    (set) => ({
      announcer: "",
      setAnnouncer: (announcer: string) => set({ announcer }),
    })
  )
