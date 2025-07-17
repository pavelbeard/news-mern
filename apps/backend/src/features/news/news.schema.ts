import z from "zod";

/**
 * VALIDATION SCHEMAS
 */

const newsSchema = z.object({
  title: z.string().min(4).max(255),
  description: z.string().max(255).optional(),
  date: z.date().default(new Date()),
  content: z.string(),
  author: z.string(),
  archiveDate: z.date().optional(),
});

export const NewsSchema = newsSchema;
export type NewSchemaType = z.infer<typeof NewsSchema>;

export const NewsCreateSchema = z.object({
  body: newsSchema,
});
export type NewsCreateSchemaType = z.infer<typeof NewsCreateSchema>;

export const newsUpdateSchema = z.object({
  params: {
    _id: z.string,
  },
  body: newsSchema,
});

export const NewsUpdateSchema = newsUpdateSchema;
export type NewsUpdateSchemaType = z.infer<typeof newsUpdateSchema>;
