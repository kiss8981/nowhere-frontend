import axios from "axios";

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const swrFetcher = async (url: string) => {
  const { data } = await fetcher.get(url);
  return data;
};
