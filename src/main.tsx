import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AppProvider } from "./contexts/app/app-context.jsx";
import "./index.css"; // اطمینان حاصل کنید که سبک‌های شما درست وارد شده‌اند



ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <AppProvider>
    <App />
  </AppProvider>
);
