import { INewsSingular__Database } from "@/lib/types/news";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function NewsCard({
  news,
}: {
  news: INewsSingular__Database["object"];
}) {
  return (
    <Card className="min-w-[600px] mx-auto border-t-2!">
      <CardHeader className="text-center text-2xl font-bold">
        {news.title}
      </CardHeader>
      <CardContent>
        Here should be an image to illustrate what happened.
        <p className="text-xs text-gray-600">{news.description}</p>
        <p className="text-lg font-semibold">{news.author}</p>
        {news?.archiveDate ? (
          <>
            <p className="text-md font-semibold">
              Archived at
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
    </Card>
  );
}
