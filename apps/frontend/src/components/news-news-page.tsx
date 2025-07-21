import { useParams } from "react-router";
import NewsCard from "./news-card";
import { useGetNewsById } from "@/lib/hooks/news/use-get-news-by-id";
import Loading from "./loading";

export default function NewsDetail() {
  const params = useParams()
  const { data, isError, isLoading } = useGetNewsById(params._id as string);
  
  if (data?.object) {
    return <NewsCard news={data?.object} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    throw new Error("Failed to fetch news details");
  }
}
