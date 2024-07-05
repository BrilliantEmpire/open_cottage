import { create } from "zustand";

export const useCounter = create((set) => ({
  postCount: 0,
  followersCount: 0,
  followingCount: 0,
  setPostCount: (count) => set((state) => ({ postCount: count })),
  setFollowersCount: (count) => set((state) => ({ followersCount: count })),
  setFollowingCount: (count) => set((state) => ({ followingCount: count })),
}));
