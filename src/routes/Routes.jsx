import { createBrowserRouter } from "react-router-dom";
import UserRoute from "./UserRoute";
import PrivateRoute from "./PrivateRoute";
import Homepage from "../pages/Landing/Homepage";
import Loginpage from "../pages/Auth/Loginpage";
import Errorpage from "../pages/Auth/Errorpage";
import Main from "../layouts/Main";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute
        // allowedRoles={["Admin", "User", "HR", "Line Manager", "Super Admin"]}
        // path={"/login"}>
        <Main />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
  
  {
    path: "/login",
    element: (
      <UserRoute path={"/"}>
        <Loginpage />
      </UserRoute>
    ),
  },
  {
    path: "*",
    element: <Errorpage />,
  },
]);
