import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./views/LandingPage.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./themes/theme.ts";
import "./index.css";

const router = createBrowserRouter([{ path: "/", element: <LandingPage /> }]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
