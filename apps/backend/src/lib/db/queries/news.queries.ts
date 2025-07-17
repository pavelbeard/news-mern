import {
  NewSchemaType,
  NewsUpdateSchemaType,
} from "@/features/news/news.schema";
import { News } from "../models/news.models";

/*CREATE*/
export const saveNews = async (data: NewSchemaType) => {
  return await News.create({
    ...data,
  });
};

/*READ*/
export const getAllNews = async () => {
  return await News.find();
};

export const getNewsById = async (_id: string) => {
  return await News.findById(_id);
};

/*UPDATE*/

export const updateNewsById = async (
  _id: string,
  data: NewsUpdateSchemaType
) => {
  return await News.updateOne({ _id }, { $set: { ...data } }, { new: true });
};

export const setNewsArchived = async (_id: string, archiveDate: Date) => {
  return await News.findByIdAndUpdate(
    _id,
    { $set: { archiveDate } },
    { new: true }
  );
};
