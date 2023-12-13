import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./views/LandingPage.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./themes/theme.ts";
import "./index.css";
import SendMoney from "./views/SendMoney.tsx";
import { persistor, store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PageLayout from "./components/PageLayout.tsx";
import TransferHistory from "./views/TransferHistory.tsx";
import ReferFriends from "./views/ReferFriends.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/transfer/send",
        element: (
          <ProtectedRoute>
            <SendMoney />
          </ProtectedRoute>
        ),
      },
      {
        path: "/transfer/history",
        element: (
          <ProtectedRoute>
            <TransferHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/refer",
        element: (
          <ProtectedRoute>
            <ReferFriends />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={appTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
