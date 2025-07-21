import { INewsObject__Database } from "@/lib/types/news";
import { Card, CardAction, CardContent, CardHeader } from "./ui/card";
import Placeholder from "@/assets/placeholder.png";
import NewsAddToArchiveDialog from "./news-add-to-archive-dialog";
import NewsEditDialog from "./news-edit-news-dialog";
import NewsDeleteArchiveDialog from "./news-delete-archive-dialog";

export default function NewsCard({
  news,
}: {
  news: INewsObject__Database["object"];
}) {
  return (
    <Card className="max-w-[600px] mx-auto border-t-2!">
      <CardAction className="flex items-center gap-2 pl-6">
        {news.archiveDate ? (
          <NewsDeleteArchiveDialog />
        ) : (
          <>
            <NewsAddToArchiveDialog />
            <NewsEditDialog />
          </>
        )}
      </CardAction>
      <CardHeader className="text-center text-2xl font-bold">
        {news.title}
      </CardHeader>
      <CardContent>
        <img src={Placeholder} alt="news-image" width={600} />
        <p className="text-xs text-gray-600">{news.description}</p>
        <p className="text-lg font-semibold">{news.author}</p>
        {news?.archiveDate ? (
          <>
            <p className="text-md font-semibold">
              Archived at{" "}
              {new Date(news.archiveDate).toLocaleDateString() +
                " " +
                new Date(news.archiveDate).toLocaleTimeString(undefined, {
                  timeStyle: "short",
                })}
            </p>
          </>
        ) : (
          <>
            <p className="text-md font-semibold">
              {new Date(news.date).toLocaleDateString() +
                " " +
                new Date(news.date).toLocaleTimeString(undefined, {
                  timeStyle: "short",
                })}
            </p>
          </>
        )}
      </CardContent>
      <CardContent>
        <p>{news.content}</p>
      </CardContent>
    </Card>
  );
}
