import { createBrowserRouter } from "react-router-dom";
import Home from "../Layout/Home/Home";
import Root from "../Layout/Root/Root";
import Login from "../Layout/Login/Login";
import Signup from "../Layout/SignUp/Signup";
import Detail from "../Layout/Home/Detail";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MealsAll from "../Pages/Meals/MealsAll";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import Dashboard from "../Layout/Dashboard/Dashboard";
import UserHome from "../Layout/Dashboard/UserHome/UserHome";
import Payment from "../Pages/Payment/Payment";
import RequestMeals from "../Layout/Dashboard/UserHome/RequestMeals";
import MyComment from "../Layout/Dashboard/UserHome/MyReviews";
import AdminProfile from "../Layout/Dashboard/Admin/AdminProfile/AdminProfile";
import AdminRoute from "./AdminRouts";
import ManageUsers from "../Layout/Dashboard/Admin/ManageUsers/ManageUsers";
import ServeMeals from "../Layout/Dashboard/Admin/ServeMeals/ServeMeals";
import AllMeals from "../Layout/Dashboard/Admin/AllMeals/AllMeals";
import AddMeal from "../Layout/Dashboard/Admin/AddMeal/AddMeal";
import AllReviews from "../Layout/Dashboard/Admin/AllReviews/AllReviews";
import Upcoming from "../Layout/Dashboard/Admin/Upcomingmeals/Upcoming";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
        path: '/detail/:id',
        element: <PrivateRoute><Detail></Detail></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/all_meals/${params.id}`)
      },
      {
        path: '/meals',
        element: <MealsAll />
      },
      {
        path: '/upcoming',
        element: <UpcomingMeals></UpcomingMeals>
      },
      {
        path: '/payment/:id',
        element: <PrivateRoute> <Payment></Payment></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/plans/${params.id}`)
      }

    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: '/dashboard/request_meal',
        element: <RequestMeals></RequestMeals>
      },
      {
        path: '/dashboard/my_comment',
        element: <MyComment></MyComment>
      },
      // admin Routs 
      {
        path: '/dashboard/adminProfile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: '/dashboard/manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: '/dashboard/allReviews',
        element: <AdminRoute><AllReviews></AllReviews></AdminRoute>
      },
      {
        path: '/dashboard/serveMeals',
        element: <AdminRoute><ServeMeals></ServeMeals></AdminRoute>
      },
      {
        path: '/dashboard/allMeals',
        element: <AdminRoute><AllMeals></AllMeals></AdminRoute>
      },
      {
        path: '/dashboard/addMeals',
        element: <AdminRoute><AddMeal></AddMeal></AdminRoute>
      },
      {
        path: '/dashboard/upcoming',
        element: <AdminRoute><Upcoming></Upcoming></AdminRoute>
      }

    ]
  }
]);

export default router;