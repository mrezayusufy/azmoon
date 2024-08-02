import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AppProvider } from "./contexts/app/app-context.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import "./index.css"; // اطمینان حاصل کنید که سبک‌های شما درست وارد شده‌اند

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
   <QueryClientProvider client={queryClient}>
  <AppProvider>
    <App />
  </AppProvider>
  </QueryClientProvider>
);
