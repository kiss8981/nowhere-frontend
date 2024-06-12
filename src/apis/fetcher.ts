import axios from "axios";

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

fetcher.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = process.env.NEXT_PUBLIC_API_URL + "/auth/kakao";
    }
    return Promise.reject(error);
  }
);

export const swrFetcher = async (url: string) => {
  const { data } = await fetcher.get(url);
  return data;
};
