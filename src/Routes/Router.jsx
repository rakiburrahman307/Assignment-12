import { createBrowserRouter } from "react-router-dom";
import Home from "../Layout/Home/Home";
import Root from "../Layout/Root/Root";
import Login from "../Layout/Login/Login";
import Signup from "../Layout/SignUp/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/sign-up",
            element: <Signup></Signup>
          }
        ],
      },
  ]);

  export default router;