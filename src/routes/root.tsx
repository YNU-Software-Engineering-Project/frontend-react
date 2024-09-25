import Template from "../template";
import Default from '../pages/DefaultPage';
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "homepage",
        element: <Default />,
      },
    ],
  },
]);

export default router;