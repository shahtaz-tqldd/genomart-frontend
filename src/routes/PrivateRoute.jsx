import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
const PrivateRoute = ({ children, allowedRoles, path }) => {
  const isLoggedIn = useAuth();
  const role = useRole();
  
  let isAllowed;

  if (allowedRoles?.includes(role)) {
    isAllowed = true;
  }
  return isLoggedIn && isAllowed ? children : <Navigate to={path} />;
};

export default PrivateRoute;
