import App from "@/App.tsx";
import { createBrowserRouter } from "react-router";
import NewsLayout from "@/components/news-layout";
import Home from "@/components/main-page";
import NewsPage from "@/components/news-page";
import Error from "@/components/global-error";
import NewsArticlePage from "@/components/news-news-page";
import NotFound from "@/components/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/news",
        element: <NewsLayout />,
        children: [
          {
            index: true,
            element: <NewsPage />,
          },
          {
            path: "id/:_id/title/:title",
            element: <NewsArticlePage />,
            errorElement: <NotFound />,
          },
        ],
      },
      {
        path: "/news-archive",
        element: <NewsLayout />,
        children: [
          {
            index: true,
            element: <NewsPage />,
          },
          {
            path: "id/:_id/title/:title",
            element: <NewsArticlePage />,
            errorElement: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export { router };
