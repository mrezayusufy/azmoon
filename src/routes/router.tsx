import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "@/components";
import { Team, NotFound, Welcome, QuestionPage, WinnerPage, HostIntroPage} from "@/pages";
import { MainLayout, IdentityLayout} from "@/layouts"
const authLoader = async () => {
  const code = localStorage.getItem("code")
  if (!code) {
    throw redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Welcome />,
        loader: authLoader,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionPage />,
    loader: authLoader,
  },
  {
    path: "host-introduction",
    element: <HostIntroPage />,
    loader: authLoader,
  },
  {
    path: "team",
    element: <Team />,
    loader: authLoader,
  },
  {
    path: "winner",
    element: <WinnerPage />,
    loader: authLoader,
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        errorElement: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
