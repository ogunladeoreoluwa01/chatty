import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";


interface AccessState {
  accessToken: string|null;
  setAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;   
}

interface RefreshState {
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  removeRefreshToken: () => void;
}

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


