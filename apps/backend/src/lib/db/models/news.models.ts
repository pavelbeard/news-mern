import mongoose from "mongoose";
import { newsSchema } from "../schemas/news.schema";

//  title, description, date, content, author, archiveDate.
export const News = mongoose.model("News", newsSchema);
