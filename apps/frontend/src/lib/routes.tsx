import App from "@/App.tsx";
import { createBrowserRouter } from "react-router";
import NewsLayout from "@/components/news-layout";
import NewsArticle from "@/components/news-article-page";
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
        Component: Home,
        loader: loaders.getLastNews,
      },
      {
        path: "/news",
        Component: NewsLayout,
        action: actions.saveNews,
        children: [
          {
            index: true,
            Component: NewsPage,
            loader: loaders.getAllNews,
          },
          {
            path: "id/:_id/title/:title",
            Component: NewsArticle,
            loader: loaders.getNewsById,
            action: actions.updateNews,
          },
        ],
      },
      {
        path: "/news-archive",
        Component: NewsLayout,
        children: [
          {
            index: true,
            Component: NewsPage,
            loader: loaders.getAllArchiveNews,
          },
          {
            path: "id/:_id/title/:title",
            Component: NewsArticle,
            loader: loaders.getNewsById,
            action: actions.archiveNewsAction,
          },
        ],
      },
    ],
  },
]);

export { router };
