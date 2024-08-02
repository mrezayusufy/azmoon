import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormState {
  orderId: number;
  typedAnswer: string;
  announcer: string;
  setOrderId: (orderId: number) => void;
  setTypedAnswer: (typedAnswer: string) => void;
  setAnnouncer: (announcer: string) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      orderId: 0,
      typedAnswer: "",
      announcer: "",
      setOrderId: (orderId: number) => set({ orderId }),
      setTypedAnswer: (typedAnswer: string) => set({ typedAnswer }),
      setAnnouncer: (announcer: string) => set({ announcer }),
    }),
    {
      name: "form-storage", // کلید برای ذخیره‌سازی در localStorage
      getStorage: () => localStorage, // استفاده از localStorage به طور پیش‌فرض
    }
  )
);
