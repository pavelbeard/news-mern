import {
  NewsCreateSchemaType,
  newsCreateSchema,
} from "@/lib/schemas/news.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router";

export const useAddArticle = () => {
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
    submit(validatedData, {
      method: "POST",
      action: "/news",
      encType: "application/json",
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
