import React from 'react';
import Home from "../home";
import Admin from "../Admin";
import MemberManage from "../MemberManage";
import PostManage from "../PostManage";
import Chat from "../chat";
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
        
        path: "admin",
        element: <Admin />,
      },
      {
        path: "membermange",
        element: <MemberManage />,
      },
      {
        path: "postmanage",
        element: <PostManage />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

export default router;