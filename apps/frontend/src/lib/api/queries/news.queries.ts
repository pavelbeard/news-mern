import { INews__Database, INewsSingular__Database } from "@/lib/types/news";
import { createUrl } from "@/utils/create-url";
import axios from "axios";

export const getAllNews = async (): Promise<INews__Database> => {
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

export const getNewsById = async (
  _id: string
): Promise<INewsSingular__Database> => {
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

export const getLastNews = async (): Promise<INewsSingular__Database> => {
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
