import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { RouterProvider } from "react-router";
import { router } from "./lib/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
