import { INewsSingular__Database } from "@/lib/types/news";
import { Link, useLoaderData } from "react-router";
import { Button } from "./ui/button";
import { createNewsURL } from "@/utils/create-news-url";
import "./styles/main-page.css";

// PORTADA
export default function Home() {
  const data = useLoaderData<INewsSingular__Database>();

  return (
    <section className="place-self-center relative max-w-[600px] p-4 mt-8 rounded-lg bg-amber-300/45 ">
      <article className="mask">
        <h1 className="text-3xl font-bold">{data.object.title}</h1>
        <h2 className="text-xl font-semibold">{data.object.author}</h2>
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
