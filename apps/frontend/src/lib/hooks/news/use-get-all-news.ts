import * as newsQueries from "@/lib/api/queries/news.queries";
import { useQuery } from "@tanstack/react-query";

export function useGetNews(isNewsArchive: boolean = false) {
  const {
    data: allNews,
    isLoading: allNewsLoading,
    isError: allNewsError,
  } = useQuery({
    queryKey: ["news"],
    queryFn: newsQueries.getAllNews,
    refetchOnWindowFocus: false,
    enabled: !isNewsArchive,
  });

  const {
    data: allArchiveNews,
    isLoading: allArchiveNewsLoading,
    isError: allArchiveNewsError,
  } = useQuery({
    queryKey: ["news-archive"],
    queryFn: newsQueries.getAllArchiveNews,
    refetchOnWindowFocus: false,
    enabled: isNewsArchive,
  });

  return {
    data: isNewsArchive ? allArchiveNews : allNews,
    isLoading: isNewsArchive ? allArchiveNewsLoading : allNewsLoading,
    isError: isNewsArchive ? allArchiveNewsError : allNewsError,
  };
}
