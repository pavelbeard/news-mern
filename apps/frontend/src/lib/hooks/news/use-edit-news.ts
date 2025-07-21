import * as newsQueries from "@/lib/api/queries/news.queries";
import {
  newsUpdateSchema,
  NewsUpdateSchemaType,
} from "@/lib/schemas/news.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useGetNewsById } from "./use-get-news-by-id";

export const useEditNews = () => {
  const query = useQueryClient();
  const params = useParams();
  const { data } = useGetNewsById(params._id as string);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(newsUpdateSchema),
    defaultValues: {
      _id: params._id as string,
      data: data?.object,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: NewsUpdateSchemaType) => {
      return newsQueries.updateNews(data);
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["news", params._id as string],
      });
    },
  });

  const onSubmit = (validatedData: NewsUpdateSchemaType) => {
    mutation.mutate(validatedData);
    setIsOpen(false);
  };

  return { onSubmit, form, isOpen, setIsOpen };
};
