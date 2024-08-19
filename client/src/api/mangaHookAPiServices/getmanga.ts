import MangaApi from "./api";

// Define an interface for the function's parameters
interface MangaListParams {
  page?: number;
  type?: string;
  state?: string;
  category?: string;
}

// Define an interface for the API response data (customize based on your API response structure)
interface MangaListResponse {
  mangaList: Array<{
    id: string;
    image: string;
    title: string;
    chapter: string;
    view: string;
    description: string;
  }>;
  metaData: {
    totalStories: number;
    totalPages: number;
    type: Array<{
      id: string;
      type: string;
    }>;
    state: Array<{
      id: string;
      type: string;
    }>;
    category: Array<{
      id: string;
      type: string;
    }>;
  };
}

// Define an interface for the error structure
interface MangaListError {
  errorCode: number;
  errorMessage: string;
}

// Function to build query string from the parameters
const buildQueryString = (params: MangaListParams): string => {
  const queryParams = new URLSearchParams();

  if (params.page !== undefined)
    queryParams.append("page", params.page.toString());
  if (params.type) queryParams.append("type", params.type);
  if (params.state) queryParams.append("state", params.state);
  if (params.category) queryParams.append("category", params.category);

  return queryParams.toString() ? `?${queryParams.toString()}` : "";
};

// Define the function with type annotations
const fetchMangaList = async (
  params: MangaListParams = {}
): Promise<MangaListResponse> => {
  try {
    const queryString = buildQueryString(params); // Build the query string from params
    const { data } = await MangaApi.get<MangaListResponse>(
      `/api/mangaList${queryString}` // Append the query string to the URL
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        JSON.stringify({
          errorCode: error.response.status,
          errorMessage: error.response.data.message,
        } as MangaListError)
      );
    } else {
      throw new Error(error.message);
    }
  }
};

export default fetchMangaList;
