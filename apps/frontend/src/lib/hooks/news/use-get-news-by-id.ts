import * as newsQueries from "@/lib//api/queries/news.queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetNewsById = (_id: string) => {
  const query = useQueryClient();

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["news", _id],
    queryFn: async () => newsQueries.getNewsById(_id),
    enabled: !!_id,
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
    invalidate: () => query.invalidateQueries({ queryKey: ["news"] }),
  };
};
