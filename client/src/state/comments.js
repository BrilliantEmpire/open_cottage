import { create } from "zustand";

export const useComments = create((set) => ({
  comments: [],
  addNewComment: (comment) =>
    set((state) => ({ comments: [comment, ...state.comments] })),
  setComments: (comments) => set((state) => ({ comments: [...comments] })),
}));
