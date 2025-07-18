import { Separator } from "./ui/separator";
import { Link, useLoaderData } from "react-router";
import { INews__Database } from "@/lib/types/news";
import { createNewsURL } from "@/utils/create-news-url";

export default function NewsPage() {
  const data = useLoaderData<INews__Database>();

  if (data?.objects) {
    return (
      <div className="flex flex-col max-w-[600px] mx-auto gap-4 px-6 bg-gray-200/20">
        {data?.objects?.map((news) => (
          <article key={news._id}>
            <Link
              to={{
                pathname: createNewsURL({
                  main: true,
                  id: news._id,
                  title: news.title,
                }),
              }}
              className="text-2xl font-bold"
            >
              {news.title}
            </Link>
            <Separator />
            <div className="flex items-center gap-1">
              <p>{news.author}</p>
              <Separator
                orientation="vertical"
                className="h-4! bg-gray-500/20!"
              />
              <p>
                {new Date(news.date).toLocaleDateString(undefined, {
                  dateStyle: "short",
                })}
              </p>
              <p>
                {new Date(news.date).toLocaleTimeString(undefined, {
                  timeStyle: "short",
                })}
              </p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return <div>Nothing</div>;
}
