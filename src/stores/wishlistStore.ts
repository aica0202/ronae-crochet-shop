import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistStore {
  handles: string[];
  toggle: (handle: string) => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      handles: [],
      toggle: (h) =>
        set({ handles: get().handles.includes(h) ? get().handles.filter((x) => x !== h) : [...get().handles, h] }),
    }),
    { name: "hbr-wishlist", storage: createJSONStorage(() => localStorage) },
  ),
);
