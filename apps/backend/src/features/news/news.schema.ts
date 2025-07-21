import z from "zod";

/**
 * VALIDATION SCHEMAS
 */

const newsSchema = z.object({
  title: z.string().min(4).max(255),
  description: z.string().max(255).optional(),
  date: z.string().default(new Date().toISOString()),
  content: z.string(),
  author: z.string(),
  archiveDate: z.date().optional(),
});

const newsParamsBaseSchema = z.object({
  params: z.object({
    _id: z.string(),
  }),
});

/*GENERAL*/
export type NewSchemaType = z.infer<typeof newsSchema>;

/*CREATE*/
export const newsCreateSchema = z.object({
  body: newsSchema,
});
export type NewsCreateSchemaType = z.infer<typeof newsCreateSchema>;

/*READ*/
export const newsReadSchema = newsParamsBaseSchema;
export type NewsReadSchemaType = z.infer<typeof newsReadSchema>;

/*UPDATE*/
export const newsUpdateSchema = newsParamsBaseSchema.extend({
  body: newsSchema,
});

export type NewsUpdateSchemaType = z.infer<typeof newsUpdateSchema>;

export const newsArchiveSchema = newsParamsBaseSchema.extend({
  body: z.object({
    archiveDate: z.string().refine((date) => {
      try {
        new Date(date).toISOString();
        return true;
      } catch {
        return false;
      }
    }),
  }),
});

export type NewsArchiveSchemaType = z.infer<typeof newsArchiveSchema>;

/*DELETE*/

export const newsDeleteSchema = newsParamsBaseSchema;
export type NewsDeleteSchemaType = z.infer<typeof newsDeleteSchema>;
