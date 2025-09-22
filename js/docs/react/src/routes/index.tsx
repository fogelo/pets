import { createBrowserRouter } from "react-router";
import App from "../App";
import CustomHooks from "../pages/CustomHooks/CustomHooks";
import ReactHooks from "../pages/ReactHooks";
import Posts from "../pages/CustomHooks/hooks/UseData/Posts";
import Some from "../pages/CustomHooks/hooks/UseSome/Some";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "custom-hooks",
        element: <CustomHooks />,
        children: [
          {
            path: "posts",
            element: <Posts />,
          },
          {
            path: "some",
            element: <Some />,
          },
        ],
      },
      {
        path: "react-hooks",
        element: <ReactHooks />,
      },
    ],
  },
]);
