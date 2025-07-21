import * as newsQueries from "@/lib/api/queries/news.queries";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

export const useAddToArchive = () => {
  const params = useParams();
  const navigator = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const archiveDate = new Date().toISOString();
      const _id = params._id as string;
      await newsQueries.setArchiveNews({
        _id,
        archiveDate,
      });
    },
    onSuccess: () => {
      navigator(location.pathname.replace(/news/, "news-archive"));
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutation.mutateAsync();
  };

  return {
    onSubmit,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isOpen,
    setIsOpen,
  };
};
