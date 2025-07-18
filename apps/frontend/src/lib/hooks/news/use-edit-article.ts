import {
  newsUpdateSchema,
  NewsUpdateSchemaType,
} from "@/lib/schemas/news.schemas";
import { INewsObject__Database } from "@/lib/types/news";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams, useSubmit } from "react-router";

export const useEditArticle = (
  defaultData: INewsObject__Database["object"]
) => {
  const params = useParams();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(newsUpdateSchema),
    defaultValues: {
      _id: params._id as string,
      data: defaultData,
    },
  });
  const submit = useSubmit();

  const onSubmit = (validatedData: NewsUpdateSchemaType) => {
    submit(validatedData, {
      method: "PUT",
      action: location.pathname,
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
