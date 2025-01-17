import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from '../Layout/Root';
import Register from "@/Pages/Register";
import Login from "@/Pages/Login";
import Dashboard from "@/Layout/Dashboard/Dashboard";

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
  },
]);

export default router;
