export interface MangaList {
  id: string;
  image: string;
  title: string;
  chapter: string;
  view: string;
  description: string;
}

export interface AccessState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
}

export interface RefreshState {
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  removeRefreshToken: () => void;
}

export interface UserIdState {
  userId: string | null;
  setUserId: (userId: string) => void;
  removeUserId: () => void;
}

export interface BookmarksState {
  bookmarks: string[];
  setBookmarks: (bookmarks: string[]) => void;
  addBookmark: (bookmark: string) => void;
  removeBookmark: (bookmark: string) => void;
  clearBookmarks: () => void;
}