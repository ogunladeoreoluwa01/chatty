import axios, { AxiosInstance } from "axios";

const MangaApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MANGA_API_BASE_URL, // Use the correct protocol (http or https) and set the correct base URL
});

export default MangaApi;
