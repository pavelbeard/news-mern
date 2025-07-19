import * as newsQueries from "@/lib/api/queries/news.queries";
import { withErrorHandler } from "@/lib/app-error-handler";
import { ActionFunctionArgs } from "react-router";

export const getLastNews = withErrorHandler(async () => {
  try {
    const data = await newsQueries.getLastNews();
    return data;
  } catch {
    return null;
  }
});

export const getAllNews = withErrorHandler(async () => {
  const data = await newsQueries.getAllNews();
  return data;
});

export const getNewsById = withErrorHandler(
  async ({ params }: ActionFunctionArgs) => {
    const data = await newsQueries.getNewsById(params._id as string);
    return data;
  }
);

export const getAllArchiveNews = withErrorHandler(async () => {
  const data = await newsQueries.getAllArchiveNews();
  return data;
});
