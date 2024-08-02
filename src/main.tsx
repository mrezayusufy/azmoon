import ReactDOM from "react-dom/client";
import { AppProvider } from "./contexts";
import router from "./routes/router.js";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./index.css";
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AppProvider>
);
