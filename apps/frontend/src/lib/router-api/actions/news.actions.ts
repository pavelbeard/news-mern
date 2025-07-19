import * as newsQueries from "@/lib/api/queries/news.queries";
import { withErrorHandler } from "@/lib/app-error-handler";
import { newsCreateSchema } from "@/lib/schemas/news.schemas";
import { parseFormData } from "@/utils/parse-form-data";
import { ActionFunctionArgs, Params } from "react-router";

export const saveNews = withErrorHandler(
  async ({ request }: ActionFunctionArgs) => {
    const parsedData = await parseFormData(request);
    const validatedData = await newsCreateSchema.safeParseAsync(parsedData);

    if (validatedData.error) {
      throw new Error(validatedData.error.message);
    }

    return await newsQueries.saveNews(validatedData?.data);
  }
);

export const updateNews = withErrorHandler(
  async ({ request }: ActionFunctionArgs) => {
    const object = await request.json();
    return await newsQueries.updateNews({
      _id: object._id as string,
      data: object.data,
    });
  }
);

export const archiveNewsAction = withErrorHandler(
  async ({ request, params }: ActionFunctionArgs) => {
    const method = request.method;

    if (method === "PATCH") {
      return await setArchiveNews(params);
    }

    if (method === "DELETE") {
      return await deleteNews(params);
    }

    return;
  }
);

export const setArchiveNews = withErrorHandler(
  async (params: Params<string>) => {
    const archiveDate = new Date().toISOString();
    const _id = params._id as string;
    return await newsQueries.setArchiveNews({
      _id,
      archiveDate,
    });
  }
);

export const deleteNews = withErrorHandler(async (params: Params<string>) => {
  await newsQueries.deleteNews(params._id as string);
  return;
});
