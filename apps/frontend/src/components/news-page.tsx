import { Separator } from "./ui/separator";
import { Link, useLocation } from "react-router";
import { createNewsURL } from "@/utils/create-news-url";
import NewsAddNewsDialog from "./news-add-news-dialog";
import { cn } from "@/lib/utils";
import Placeholder from "@/assets/placeholder.png";
import { useGetNews } from "@/lib/hooks/news/use-get-all-news";

export default function NewsPage() {
  const location = useLocation();
  const isNewsArchive = Boolean(location.pathname.match(/^(\/news-archive)/));

  const { data } = useGetNews(isNewsArchive);

  if (data?.objects && data.objects.length > 0) {
    return (
      <div
        className={cn(
          "flex flex-col w-[600px] mx-auto gap-4 px-6 bg-gray-200/20",
          data.objects.length > 2 ? "rounded-t-3xl" : "rounded-3xl"
        )}
      >
        {!isNewsArchive && <NewsAddNewsDialog className="w-32 my-4" />}
        <div className={cn("flex flex-col space-y-2", isNewsArchive && "my-4")}>
          {data?.objects?.map((news) => (
            <Link
              key={news._id}
              to={{
                pathname: createNewsURL({
                  archive: Boolean(news?.archiveDate),
                  main: true,
                  id: news._id,
                  title: news.title,
                }),
              }}
            >
              <article className="p-6 bg-amber-300/80 rounded-2xl flex flex-col gap-0.5">
                <h1 className="text-2xl font-bold">{news.title}</h1>
                <img src={Placeholder} alt={`news-placeholder-${news._id}`} />
                <div className="flex items-center gap-1">
                  <p>{news.author}</p>
                  <Separator
                    orientation="vertical"
                    className="h-4! bg-gray-900!"
                  />
                  {news.archiveDate ? (
                    <>
                      <p>
                        {new Date(news.archiveDate).toLocaleDateString(
                          undefined,
                          {
                            dateStyle: "short",
                          }
                        )}
                      </p>
                      <p>
                        {new Date(news.archiveDate).toLocaleTimeString(
                          undefined,
                          {
                            timeStyle: "short",
                          }
                        )}
                      </p>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="place-self-center flex flex-col py-4 px-8 mt-4 items-center gap-4 bg-amber-300 rounded-2xl">
      <header className="text-3xl font-bold">Nothing here</header>
      {!isNewsArchive && <NewsAddNewsDialog />}
    </div>
  );
}
