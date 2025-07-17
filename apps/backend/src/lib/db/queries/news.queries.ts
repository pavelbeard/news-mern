import {
  NewSchemaType,
  NewsUpdateSchemaType,
} from "@/features/news/news.schema";
import { News } from "../models/news.models";

/*CREATE*/
export const saveNews = async (data: NewSchemaType) => {
  return await News.create({
    ...data,
  }).then((res) => res.toObject());
};

/*READ*/
export const getAllNews = async () => {
  return (await News.find().lean()).toSorted(
    (a, b) => b.date.getDate() - a.date.getDate()
  );
};

export const getNewsById = async (_id: string) => {
  return await News.findById(_id).then((res) => res?.toObject());
};

export const getNewsByTitle = async (title: string) => {
  return await News.findOne({
    title,
  }).then((res) => res?.toObject());
};

/*UPDATE*/
export const updateNewsById = async (
  _id: string,
  data: NewsUpdateSchemaType["body"]
) => {
  return await News.findByIdAndUpdate(
    { _id },
    { $set: { ...data } },
    { new: true }
  ).then((i) => i?.toObject());
};

export const setNewsArchived = async (_id: string, archiveDate: Date) => {
  return await News.findByIdAndUpdate(
    _id,
    { $set: { archiveDate } },
    { new: true }
  ).then((res) => res?.toObject());
};

/*DELETE*/
export const deleteNews = async (_id: string) => {};
