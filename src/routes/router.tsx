import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../features/identity/components/login";
import IdentityLayout from "../layouts/identity-layout";
import {Scores, Team, NotFound, UnhandledException, Welcome, QuestionPage} from "../pages";
const authLoader = async () => {
  const gameStorage = JSON.parse(localStorage.getItem("game-storage") as string)
  const code = gameStorage.state.code;
  if (!code) {
    throw redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <UnhandledException />,
    children: [
      {
        index: true,
        element: (
            <Welcome />
        ),
        loader: authLoader,
      },
      {
        path: "question",
        element: <QuestionPage />,
        loader: authLoader,
      },
      {
        path: "team",
        element: <Team />,
        loader: authLoader,
      },
      {
        path: "score",
        element: <Scores />,
        loader: authLoader,
      },
    ],
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
