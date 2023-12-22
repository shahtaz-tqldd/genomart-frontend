import { useSelector } from "react-redux";

export default function useRole() {
  const { token: authToken, user } = useSelector((state) => state?.auth);
  if (authToken && user) {
    return user?.role;
  }
}
