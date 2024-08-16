import axios, { AxiosInstance } from "axios";

const MangaApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Use the correct protocol (http or https) and set the correct base URL
});

export default MangaApi;
