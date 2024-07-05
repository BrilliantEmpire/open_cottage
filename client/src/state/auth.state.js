import { create } from "zustand";

export const useAuth = create((set) => ({
  isLogin: false,
  loginUser: (user) => set((state) => ({ isLogin: true })),
}));
