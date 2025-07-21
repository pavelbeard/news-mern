import * as newsQueries from "@/lib/api/queries/news.queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

export const useAddToArchive = () => {
  const params = useParams();
  const navigator = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      const archiveDate = new Date().toISOString();
      const _id = params._id as string;
      return newsQueries.setArchiveNews({
        _id,
        archiveDate,
      });
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["news"] });
      query.invalidateQueries({ queryKey: ["news", params._id] });
      query.invalidateQueries({ queryKey: ["news-archive"] });
      query.invalidateQueries({ queryKey: ["news-archive", params._id] });
      navigator(location.pathname.replace(/news/, "news-archive"));
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
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
