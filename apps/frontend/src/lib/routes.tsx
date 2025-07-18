import App from "@/App.tsx";
import { createBrowserRouter } from "react-router";
import * as newsQueries from "./api/queries/news.queries";
import NewsLayout from "@/components/news-layout";
import NewsArticle from "@/components/news-article";
import Home from "@/components/main-page";
import NewsPage from "@/components/news-page";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => {
          let data = newsQueries.getLastNews();
          return data;
        },
      },
      {
        path: "/news",
        Component: NewsLayout,
        children: [
          {
            index: true,
            Component: NewsPage,
            loader: async () => {
              let data = await newsQueries.getAllNews();
              return data;
            },
          },
          {
            path: "id/:_id/title/:title",
            Component: NewsArticle,
            loader: async ({ params }) => {
              let data = await newsQueries.getNewsById(params._id as string);
              return data;
            },
          },
        ],
      },
    ],
  },
]);

export { router };
