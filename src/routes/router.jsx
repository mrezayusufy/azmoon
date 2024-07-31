import { createBrowserRouter, redirect } from "react-router-dom";
import Login, { loginAction } from "../features/identity/components/login";
import IdentityLayout from "../layouts/identity-layout";
import Question from "../pages/question/question";
import Score from "../pages/score/score";
import Team from "../pages/team/team";
import NotFound from "../pages/not-found";
import UnhandledException from "../pages/unhandled-exception";
import Welcome from "../components/welcom/index";

// Authentication loader
const authLoader = async () => {
  const code = localStorage.getItem("code"); // Replace this with your actual authentication check
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
        element: <Question />,
        loader: authLoader,
      },
      {
        path: "team",
        element: <Team />,
        loader: authLoader,
      },
      {
        path: "score",
        element: <Score />,
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
        action: loginAction,
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
