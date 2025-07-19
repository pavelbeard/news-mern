import {
  newsArchiveSchema,
  NewsArchiveSchemaType,
  NewsCreateSchemaType,
  newsUpdateSchema,
  NewsUpdateSchemaType,
} from "@/lib/schemas/news.schemas";
import {
  INewsObject__Database,
  INewsObjects__Database,
} from "@/lib/types/news";
import { ApiClient } from "@/utils/api-client";
import { createUrl } from "@/utils/create-url";

// CREATE
export const saveNews = async (
  data: NewsCreateSchemaType
): Promise<INewsObject__Database> => {
  const response = await ApiClient.post(createUrl("news"), data);
  return response;
};

// READ
export const getAllNews = async (): Promise<INewsObjects__Database> => {
  const response = await ApiClient.get(createUrl("news"));
  return response;
};

export const getAllArchiveNews = async (): Promise<INewsObjects__Database> => {
  const response = await ApiClient.get(createUrl("news-archive"));
  return response;
};

export const getNewsById = async (
  _id: string
): Promise<INewsObject__Database> => {
  const response = await ApiClient.get(createUrl("news", _id));
  return response as INewsObject__Database;
};

export const getLastNews = async (): Promise<INewsObject__Database> => {
  const response = await ApiClient.get(createUrl("news-last"));

  return response as INewsObject__Database;
};

// UPDATE

export const updateNews = async (
  data: NewsUpdateSchemaType
): Promise<INewsObject__Database> => {
  const validatedData = await newsUpdateSchema.safeParseAsync(data);

  if (!validatedData.success) {
    throw new Error("Invalid data: ", validatedData.error);
  }

  const response = await ApiClient.put(
    createUrl("news", validatedData.data._id),
    validatedData.data.data
  );

  return response;
};

export const setArchiveNews = async (
  data: NewsArchiveSchemaType
): Promise<INewsObject__Database> => {
  const validatedData = await newsArchiveSchema.safeParseAsync(data);

  if (!validatedData.success) {
    throw new Error("Invalid data: ", validatedData.error);
  }

  const response = await ApiClient.patch(
    createUrl("news", validatedData.data._id),
    validatedData.data
  );

  return response;
};

// DELETE

export const deleteNews = async (_id: string) => {
  await ApiClient.delete(createUrl("news", _id));
};
