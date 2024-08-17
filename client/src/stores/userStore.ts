import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { RefreshState,AccessState,UserIdState,BookmarksState } from '@/types/types';


export const useBookmarkStore = create<BookmarksState>()(
  devtools(
    persist(
      (set) => ({
        bookmarks: [],
        setBookmarks: (bookmarks) => set({ bookmarks }),
        addBookmark: (bookmark) =>
          set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
        removeBookmark: (bookmark) =>
          set((state) => ({
            bookmarks: state.bookmarks.filter((b) => b !== bookmark),
          })),
        clearBookmarks: () => set({ bookmarks: [] }),
      }),
      {
        name: "bookmark",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export const useAccessStore = create<AccessState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        setAccessToken: (accessToken) => set({ accessToken }),
        removeAccessToken: () => set({ accessToken: null }),
      }),
      {
        name: "accessToken",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export const useUserIdStore = create<UserIdState>()(
  devtools(
    persist(
      (set) => ({
        userId: null,
        setUserId: (userId) => set({ userId }),
        removeUserId: () => set({ userId: null }),
      }),
      {
        name: "userId",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export const useRefreshStore = create<RefreshState>()(
  devtools(
    persist(
      (set) => ({
        refreshToken: null,
        setRefreshToken: (refreshToken) => set({ refreshToken }),
        removeRefreshToken: () => set({ refreshToken: null }),
      }),
      {
        name: "refreshToken",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);


