import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { useEffect } from "react";
import { useAppContext } from "./contexts/app/app-context";


const App = () => {
  const { theme } = useAppContext();
  useEffect(() => {
    const head = document.head;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/css/${theme}.css`;
    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [theme]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
