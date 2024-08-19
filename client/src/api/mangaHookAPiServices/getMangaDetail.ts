import MangaApi from "./api";
import { MangaDetail as MangaDetailsResponse } from "@/types/types";

// Define an interface for the function's parameters
interface MangaDetailsParams {
  mangaId: string|undefined;
}

// Define an interface for the error structure
interface MangaDetailsError {
  errorCode: number;
  errorMessage: string;
}

// Define the function with type annotations
const fetchMangaDetails = async (
  params: MangaDetailsParams
): Promise<MangaDetailsResponse> => {
  const { mangaId } = params; // Destructure the mangaId from params

  try {
    const { data } = await MangaApi.get<MangaDetailsResponse>(
      `/api/manga/${mangaId}` // Append the mangaId to the URL
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        JSON.stringify({
          errorCode: error.response.status,
          errorMessage: error.response.data.message,
        } as MangaDetailsError)
      );
    } else {
      throw new Error(error.message);
    }
  }
};

export default fetchMangaDetails;
