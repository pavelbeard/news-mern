import App from "@/App.tsx";
import { createBrowserRouter } from "react-router";
import NewsLayout from "@/components/news-layout";
import Home from "@/components/main-page";
import NewsPage from "@/components/news-page";
import Error from "@/components/error";
import * as loaders from "./router-api/loaders/news.loaders";
import * as actions from "./router-api/actions/news.actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: loaders.getLastNews,
      },
      {
        path: "/news",
        element: <NewsLayout />,
        action: actions.saveNews,
        children: [
          {
            index: true,
            element: <NewsPage />,
            loader: loaders.getAllNews,
          },
          {
            path: "id/:_id/title/:title",
            lazy: async () => {
              const newsArticlePage = await import(
                "@/components/news-article-page"
              );
              const actions = await import(
                "@/lib/router-api/actions/news.actions"
              );
              const loaders = await import(
                "@/lib/router-api/loaders/news.loaders"
              );
              return {
                element: <newsArticlePage.default />,
                loader: loaders.getNewsById,
                action: actions.updateNews,
              };
            },
          },
        ],
      },
      {
        path: "/news-archive",
        element: <NewsLayout />,
        children: [
          {
            index: true,
            lazy: async () => {
              const newsPage = await import("@/components/news-page");
              const loaders = await import(
                "@/lib/router-api/loaders/news.loaders"
              );

              return {
                element: <newsPage.default />,
                loader: loaders.getAllArchiveNews,
              };
            },
          },
          {
            path: "id/:_id/title/:title",
            lazy: async () => {
              const newsArticlePage = await import(
                "@/components/news-article-page"
              );
              const actions = await import(
                "@/lib/router-api/actions/news.actions"
              );
              const loaders = await import(
                "@/lib/router-api/loaders/news.loaders"
              );

              return {
                element: <newsArticlePage.default />,
                action: actions.archiveNewsAction,
                loader: loaders.getNewsById,
              };
            },
          },
        ],
      },
    ],
  },
]);

export { router };
