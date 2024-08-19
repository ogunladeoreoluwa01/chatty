export interface MangaList {
  id: string;
  image: string;
  title: string;
  chapter: string;
  view: string;
  description: string;
}
export interface MangaDetail {
  imageUrl: string;
  name: string;
  author: string;
  status: "Ongoing" | "Completed" | "Dropped" | "Hiatus";
  updated: string;
  view: string;
  genres: string[];
  chapterList: Chapter[];
}

export interface Chapter {
  id: string;
  path: string;
  name: string;
  view: string;
  createdAt: string;
}

export interface ChapterDetail {
  title: string;
  currentChapter: string;
  chapterListIds: ChapterListId[];
  images: ChapterImage[];
}

export interface ChapterListId {
  id: string;
  name: string;
}

interface ChapterImage {
  title: string;
  image: string;
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

