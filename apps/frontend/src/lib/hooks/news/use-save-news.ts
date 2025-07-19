import * as newsQueries from "@/lib/api/queries/news.queries";
import {
  NewsCreateSchemaType,
  newsCreateSchema,
} from "@/lib/schemas/news.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router";

export const useSaveNews = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const submit = useSubmit();

  const onSubmit = (validatedData: NewsCreateSchemaType) => {
    const formData = new FormData();
    for (const [k, v] of Object.entries(validatedData)) {
      formData.set(k, String(v));
    }

    submit(formData, {
      method: "POST",
      action: "/news",
    });

    setIsOpen(false);
  };

  return {
    form,
    onSubmit,
    isOpen,
    setIsOpen,
  };
};

export const useSaveNews_v2 = () => {
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

  const onSubmit = useMutation({
    mutationFn: async (validatedData: NewsCreateSchemaType) => {
      return newsQueries.saveNews(validatedData);
    },
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["news", "last-news"] });
    },
  });

  return {
    form,
    onSubmit,
    isOpen,
    setIsOpen,
  };
};
