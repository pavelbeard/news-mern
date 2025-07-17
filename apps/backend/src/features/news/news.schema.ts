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

/*GENERAL*/
export type NewSchemaType = z.infer<typeof newsSchema>;

/*CREATE*/
export const newsCreateSchema = z.object({
  body: newsSchema,
});
export type NewsCreateSchemaType = z.infer<typeof newsCreateSchema>;

/*READ*/
export const newsReadSchema = z.object({
  params: z.object({
    _id: z.string(),
  }),
});

export type NewsReadSchemaType = z.infer<typeof newsReadSchema>;

/*UPDATE*/
const newsUpdateBaseSchema = z.object({
  params: z.object({
    _id: z.string(),
  }),
});

export const newsUpdateSchema = newsUpdateBaseSchema.extend({
  body: newsSchema,
});

export type NewsUpdateSchemaType = z.infer<typeof newsUpdateSchema>;

export const newsArchiveSchema = newsUpdateBaseSchema.extend({
  body: z.object({
    archiveDate: z.date(),
  }),
});

export type NewsArchiveSchemaType = z.infer<typeof newsArchiveSchema>;
