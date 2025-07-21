import * as newsQueries from "@/lib/api/queries/news.queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export const useDeleteArchive = () => {
  const navigator = useNavigate();
  const params = useParams();
  const query = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => {
      return newsQueries.deleteNews(params._id as string);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["news-archive"] });
      query.invalidateQueries({ queryKey: ["news-archive", params._id] });
      navigator("/news-archive");
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    onSubmit,
    isOpen,
    setIsOpen,
  };
};
