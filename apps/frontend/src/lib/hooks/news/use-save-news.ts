import * as newsQueries from "@/lib/api/queries/news.queries";
import {
  NewsCreateSchemaType,
  newsCreateSchema,
} from "@/lib/schemas/news.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSaveNews = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(newsCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      author: "",
      content: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (validatedData: NewsCreateSchemaType) => {
      return newsQueries.saveNews(validatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setIsOpen(false);
    },
  });

  const onSubmit = (validatedData: NewsCreateSchemaType) => {
    mutation.mutate(validatedData);
  };

  return {
    isError: mutation.isError,
    isLoading: mutation.isPending,
    form,
    onSubmit,
    isOpen,
    setIsOpen,
  };
};
