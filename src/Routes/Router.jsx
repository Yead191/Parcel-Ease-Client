import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from '../Layout/Root';
import Register from "@/Pages/Register";
import Login from "@/Pages/Login";
import Dashboard from "@/Layout/Dashboard/Dashboard";
import UserHome from "@/Pages/UserDashboard/UserHome";
import BookParcel from "@/Pages/UserDashboard/BookParcel";
import MyParcel from "@/Pages/UserDashboard/MyParcel";
import UpdateParcel from "@/Pages/UserDashboard/UpdateParcel";
import AllUsers from "@/Pages/AdminDashboard/AllUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      //user
      {
        path: 'profile',
        element: <UserHome></UserHome>
      },
      {
        path: 'book-parcel',
        element: <BookParcel></BookParcel>
      },
      {
        path: 'my-parcel',
        element: <MyParcel></MyParcel>
      },
      {
        path: 'update-parcel/:id',
        element: <UpdateParcel></UpdateParcel>,
        loader: ({ params }) => fetch(`http://localhost:5000/parcel/${params.id}`)
      },
      //admin
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      },
    ]
  },
]);

export default router;
