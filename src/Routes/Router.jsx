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
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`http://localhost:5000/parcel/${params.id}`)
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
      {
        path: 'all-parcel',
        element: <AllParcel></AllParcel>
      },
      {
        path: 'delivery-men',
        element: <AllDeliveryMan></AllDeliveryMan>
      },

      //Delivery man routes
      {
        path: 'my-delivery',
        element: <MyDelivery></MyDelivery>
      },
      {
        path: 'my-reviews',
        element: <MyReviews></MyReviews>
      },
    ]
  },
]);

export default router;
