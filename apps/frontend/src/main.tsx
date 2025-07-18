import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { RouterProvider } from "react-router";
import { router } from "./lib/routes";

import "@/utils/capitalize";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
