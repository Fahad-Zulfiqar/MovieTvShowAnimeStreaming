import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// i18n (needs to be bundled)
import "./i18n";

// Router
import { RouterProvider } from "react-router-dom";
import router from "./router/index";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </Provider>
    </Suspense>
  </StrictMode>
);
