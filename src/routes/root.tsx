import Home from "../home";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";
import ForgotPassword from "../pages/login/ForgotPassword";
import Template from "../template";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;