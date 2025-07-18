import {
  newsArchiveSchema,
  NewsArchiveSchemaType,
  newsCreateSchema,
  newsUpdateSchema,
  NewsUpdateSchemaType,
} from "@/lib/schemas/news.schemas";
import {
  INews,
  INewsObject__Database,
  INewsObjects__Database,
} from "@/lib/types/news";
import { createUrl } from "@/utils/create-url";
import axios from "axios";

// CREATE
export const saveNews = async (data: INews): Promise<INewsObject__Database> => {
  const validatedData = await newsCreateSchema.safeParseAsync(data);

  if (!validatedData.success) {
    throw new Error("Invalid data: ", validatedData.error);
  }

  const response = await axios.post(createUrl("news"), data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 201) {
    throw new Error(response.statusText);
  }

  return response.data;
};

// READ
export const getAllNews = async (): Promise<INewsObjects__Database> => {
  const response = await axios.get(createUrl("news"), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export const getAllArchiveNews = async (): Promise<INewsObjects__Database> => {
  const response = await axios.get(createUrl("news-archive"), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export const getNewsById = async (
  _id: string
): Promise<INewsObject__Database> => {
  const response = await axios.get(createUrl("news", _id), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export const getLastNews = async (): Promise<INewsObject__Database> => {
  const response = await axios.get(createUrl("news-last"), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};

// UPDATE

export const updateNews = async (data: NewsUpdateSchemaType) => {
  const validatedData = await newsUpdateSchema.safeParseAsync(data);

  if (!validatedData.success) {
    throw new Error("Invalid data: ", validatedData.error);
  }

  const response = await axios.put(
    createUrl("news", validatedData.data._id),
    validatedData.data.data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};

export const setArchiveNews = async (data: NewsArchiveSchemaType) => {
  const validatedData = await newsArchiveSchema.safeParseAsync(data);

  if (!validatedData.success) {
    throw new Error("Invalid data: ", validatedData.error);
  }

  const response = await axios.patch(
    createUrl("news", validatedData.data._id),
    validatedData.data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
};

// DELETE

export const deleteNews = async (_id: string) => {
  const response = await axios.delete(createUrl("news", _id), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
};
