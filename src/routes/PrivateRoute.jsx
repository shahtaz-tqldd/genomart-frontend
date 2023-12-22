import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
const PrivateRoute = ({ children, allowedRoles, path }) => {
  const isLoggedIn = useAuth();
  const role = useRole()

  let isAllowed;

  for (const element of allowedRoles) {
    if (role?.includes(element)) {
      isAllowed = true;
      break;
    }
  }

  return isLoggedIn && isAllowed ? (
    children
  ) : (
    <Navigate to={path} />
  );
};

export default PrivateRoute;
