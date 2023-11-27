import { createBrowserRouter } from "react-router-dom";
import Home from "../Layout/Home/Home";
import Root from "../Layout/Root/Root";
import Login from "../Layout/Login/Login";
import Signup from "../Layout/SignUp/Signup";
import Detail from "../Layout/Home/Detail";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Meals from "../Pages/Meals/Meals";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage />,
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
          },
          {
            path:'/detail/:id',
            element: <PrivateRoute><Detail></Detail></PrivateRoute>,
            loader: ({params})=> fetch(`http://localhost:5000/all_meals/${params.id}`)
          },
          {
            path:'/meals',
            element:<Meals></Meals>
          },
          {
            path:'/upcoming',
            element: <UpcomingMeals></UpcomingMeals>
          }
        ],
      },
  ]);

  export default router;