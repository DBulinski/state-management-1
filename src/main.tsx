import * as React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ThemeProvider } from "./ThemeProvider";
import { worker } from "./server/worker";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

worker.start().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
);
