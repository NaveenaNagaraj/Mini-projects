import React from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import Edit from "./pages/Edit";
import { SidbarContextState } from "./context/SidbarContext";
import { PostContextState } from "./context/PostContext";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Write from "./pages/Write";


const Layout = () => {
  return (
    <div className="relative z-0">
      <SidbarContextState>
        <Navbar />
        <PostContextState>
          <Outlet />
        </PostContextState>
        <Footer />
      </SidbarContextState>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path:"post/:id/edit",
        element:<Edit/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
