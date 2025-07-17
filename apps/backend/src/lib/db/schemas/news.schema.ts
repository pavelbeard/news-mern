import { Schema } from "mongoose";

/**
 * DATABASE SCHEMAS
 */

export interface INews {
  title: string;
  description?: string;
  date: Date;
  content: string;
  author: string;
  archiveDate?: Date;
}

export const newsSchema = new Schema<INews>({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, default: new Date() },
  content: { type: String, required: true },
  author: { type: String, required: true },
  archiveDate: Date,
});
