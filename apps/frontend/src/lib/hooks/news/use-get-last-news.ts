import * as newsQueries from "@/lib/api/queries/news.queries";
import { useQuery } from "@tanstack/react-query";

export const useGetLastNews = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["last-news"],
    queryFn: newsQueries.getLastNews,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
