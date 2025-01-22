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
import AllParcel from "@/Pages/AdminDashboard/AllParcel";
import AllDeliveryMan from "@/Pages/AdminDashboard/AllDeliveryMan";
import MyDelivery from "@/Pages/DeliveryDashboard/MyDelivery";
import MyReviews from "@/Pages/DeliveryDashboard/MyReviews";
import Payment from "@/Pages/UserDashboard/Payment";
import PaymentHistory from "@/Pages/UserDashboard/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Statistics from "@/Pages/AdminDashboard/Statistics";
import DeliveryRoute from "./DeliveryRoute";
import Home from "@/Pages/Home";

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
      {
        path: '/',
        element: <Home />
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
        element: <PrivateRoute><UserHome></UserHome> </PrivateRoute>
      },
      {
        path: 'book-parcel',
        element: <PrivateRoute> <BookParcel></BookParcel></PrivateRoute>
      },
      {
        path: 'my-parcel',
        element: <PrivateRoute> <MyParcel></MyParcel></PrivateRoute>
      },
      {
        path: 'payment-history',
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/parcel/${params.id}`)
      },
      {
        path: 'update-parcel/:id',
        element: <PrivateRoute><UpdateParcel></UpdateParcel></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/parcel/${params.id}`)
      },
      //admin
      {
        path: 'users',
        element: <AdminRoute> <AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'statistics',
        element: <AdminRoute> <Statistics></Statistics></AdminRoute>
      },
      {
        path: 'all-parcel',
        element: <AdminRoute><AllParcel></AllParcel></AdminRoute>
      },
      {
        path: 'delivery-men',
        element: <AdminRoute><AllDeliveryMan></AllDeliveryMan></AdminRoute>
      },

      //Delivery man routes
      {
        path: 'my-delivery',
        element: <DeliveryRoute><MyDelivery></MyDelivery></DeliveryRoute>
      },
      {
        path: 'my-reviews',
        element: <DeliveryRoute><MyReviews></MyReviews></DeliveryRoute>
      },
    ]
  },
]);

export default router;
