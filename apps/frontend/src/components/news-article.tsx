import { INewsSingular__Database } from "@/lib/types/news";
import { useLoaderData } from "react-router";
import NewsCard from "./news-card";

export default function NewsArticle() {
  const data = useLoaderData<INewsSingular__Database>();
  return <NewsCard news={data.object} />;
}
