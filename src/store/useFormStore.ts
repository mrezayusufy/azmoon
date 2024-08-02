import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormState {
  orderId: number;
  typedAnswer: string;
  announcer: string;
  setOrderId: (orderId: number) => void;
  incrementOrderId: () => void;
  setTypedAnswer: (typedAnswer: string) => void;
  setAnnouncer: (announcer: string) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      orderId: 1,
      typedAnswer: "",
      announcer: "",
      setOrderId: (orderId: number) => set({ orderId }),
      incrementOrderId: () => set((state) => ({ orderId: state.orderId + 1 })),
      setTypedAnswer: (typedAnswer: string) => set({ typedAnswer }),
      setAnnouncer: (announcer: string) => set({ announcer }),
    }),
    {
      name: "form-storage", // Key for storing in localStorage
      getStorage: () => localStorage, // Use localStorage by default
    }
  )
);
