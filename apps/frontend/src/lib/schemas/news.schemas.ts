import { InterfaceToSchema } from "@/utils/interface-to-schema";
import z from "zod";
import {
  INews,
  INewsArchive__Database,
  INewsUpdate__Database,
} from "../types/news";

const newsBaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
});

// CREATE
export const newsCreateSchema = z.object({
  ...newsBaseSchema.shape,
}) satisfies InterfaceToSchema<INews>;

export type NewsCreateSchemaType = z.infer<typeof newsCreateSchema>;

// UPDATE
export const newsUpdateSchema = z.object({
  _id: z.string(),
  data: z.object({
    ...newsBaseSchema.shape,
  }),
}) satisfies InterfaceToSchema<INewsUpdate__Database>;

export type NewsUpdateSchemaType = z.infer<typeof newsUpdateSchema>;

export const newsArchiveSchema = z.object({
  _id: z.string(),
  archiveDate: z.string(),
}) satisfies InterfaceToSchema<INewsArchive__Database>;

export type NewsArchiveSchemaType = z.infer<typeof newsArchiveSchema>;
