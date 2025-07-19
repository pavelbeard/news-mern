import * as newsQueries from "@/lib/api/queries/news.queries";
import { useQuery } from "@tanstack/react-query";

export function useGetAllNews() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: newsQueries.getAllNews,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
