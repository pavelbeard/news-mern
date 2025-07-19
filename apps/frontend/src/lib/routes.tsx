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
            lazy: {
              Component: async () =>
                (await import("@/components/news-article-page")).default,
              loader: async () =>
                (await import("@/lib/router-api/loaders/news.loaders"))
                  .getNewsById,
              action: async () =>
                (await import("@/lib/router-api/actions/news.actions"))
                  .updateNews,
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
            lazy: {
              Component: async () =>
                (await import("@/components/news-page")).default,
              loader: async () =>
                (await import("@/lib/router-api/loaders/news.loaders"))
                  .getAllArchiveNews,
            },
          },
          {
            path: "id/:_id/title/:title",
            lazy: {
              Component: async () =>
                (await import("@/components/news-article-page")).default,
              loader: async () =>
                (await import("@/lib/router-api/loaders/news.loaders"))
                  .getNewsById,
              action: async () =>
                (await import("@/lib/router-api/actions/news.actions"))
                  .archiveNewsAction,
            },
          },
        ],
      },
    ],
  },
]);

export { router };
