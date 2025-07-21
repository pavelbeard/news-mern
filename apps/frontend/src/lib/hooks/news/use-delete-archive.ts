import * as newsQueries from "@/lib/api/queries/news.queries";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export const useDeleteArchive = () => {
  const navigator = useNavigate();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      await newsQueries.deleteNews(params._id as string);
    },
    onSuccess: () => {
      navigator("/news-archive", { replace: true });
    },
  });

  const onSubmit = async () => {
    await mutation.mutateAsync();
  };

  return {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    onSubmit,
    isOpen,
    setIsOpen,
  };
};
