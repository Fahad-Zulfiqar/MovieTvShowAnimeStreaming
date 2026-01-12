import axios, { type AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  page: number;
  results: T[];
  next?: string | null;
  total_pages: number;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  params: {
    api_key: import.meta.env.VITE_API_APIKEY,
    append_to_response: "videos",
  },
});

class ApiClient<T> {
  constructor(public endpoint: string) {}
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  getSeasonEpisodes = (id: string | number, seasonNumber: number) => {
    return axiosInstance
      .get(`${this.endpoint}/${id}/season/${seasonNumber}`) // Specify the expected response type
      .then((res) => res.data.episodes); // Return the episodes array
  };
}

export default ApiClient;
