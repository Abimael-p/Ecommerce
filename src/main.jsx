import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router/index.jsx";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuereyClintProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QuereyClintProvider>
  </React.StrictMode>
);
