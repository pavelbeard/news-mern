import { INewsObject__Database } from "@/lib/types/news";
import { Link, useLoaderData } from "react-router";
import { Button } from "./ui/button";
import { createNewsURL } from "@/utils/create-news-url";
import { format } from "date-fns";
import Placeholder from "@/assets/placeholder.png";

// PORTADA
export default function Home() {
  const data = useLoaderData<INewsObject__Database>();

  return (
    <section className="place-self-center relative max-w-[600px] p-4 mt-8 rounded-lg bg-amber-300/45 ">
      <article
        className="flex flex-col gap-4"
        style={{
          WebkitMaskImage: "linear-gradient(black 25%, transparent)",
          maskImage: "linear-gradient(black 5%, transparent)",
          maskPosition: "top",
        }}
      >
        <h1 className="text-3xl font-bold">{data.object.title}</h1>
        <img src={Placeholder} alt="news-image-main" width={800} />
        <div className="flex items-end gap-2">
          <h2 className="text-xl font-semibold">{data.object.author}</h2>
          <p>{format(data.object.date, "dd-MM-yyyy HH:mm")}</p>
        </div>
        <p>{data.object.content}</p>
      </article>
      <Button className="absolute bottom-0 left-0 w-full h-16" asChild>
        <Link
          to={{
            pathname: createNewsURL({
              main: true,
              id: data.object._id,
              title: data.object.title,
            }),
          }}
          className="text-xl hover:bg-gray-600!"
        >
          Read article?
        </Link>
      </Button>
    </section>
  );
}
