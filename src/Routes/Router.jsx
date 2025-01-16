import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from '../Layout/Root';
import Register from "@/Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/register',  
        element: <Register />  
      }
    ]
  },
]);

export default router;
