import {
  NewSchemaType,
  NewsUpdateSchemaType,
} from "api/features/news/news.schema";
import { News } from "../models/news.models";

/*CREATE*/
export const saveNews = async (data: NewSchemaType) => {
  return await News.create({
    ...data,
  });
};

/*READ*/
/**
 * returns all unarchive news
 */
export const getAllNews = async () => {
  return await News.find(
    {
      $or: [
        { archiveDate: { $eq: null } },
        { archiveDate: { $exists: false } },
      ],
    },
    {},
    {
      sort: { date: -1 },
    }
  );
};

export const getAllArchiveNews = async () => {
  return await News.find(
    {
      $or: [
        { archiveDate: { $not: { $eq: null } } },
        { archiveDate: { $exists: true } },
      ],
    },
    {},
    {
      sort: { archiveDate: -1 },
    }
  );
};

export const getNewsById = async (_id: string) => {
  return await News.findById(_id);
};

export const getNewsByTitle = async (title: string) => {
  return await News.findOne({
    title: { $regex: title.replaceAll(/-/g, " "), $options: "i" },
  });
};

export const getLastNews = async () => {
  return (
    await News.find(
      {
        $or: [
          { archiveDate: { $eq: null } },
          { archiveDate: { $exists: false } },
        ],
      },
      {},
      {
        sort: { date: -1 },
        limit: 1,
      }
    )
  ).pop();
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
  );
};

export const setNewsArchived = async (_id: string, archiveDate: string) => {
  return await News.findByIdAndUpdate(
    _id,
    { $set: { archiveDate } },
    { new: true }
  );
};

/*DELETE*/
export const deleteNews = async (_id: string) => {
  await News.deleteOne({ _id });
};
