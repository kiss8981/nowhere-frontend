import { swrFetcher } from "@/apis/fetcher";
import { User } from "@/types/User";
import useSWR from "swr";

const useAuth = () => {
  const { data, error, mutate } = useSWR<User>("/auth/me", swrFetcher);

  return {
    user: data,
    error,
    loading: !data && !error,
    mutate,
  };
};

export default useAuth;
