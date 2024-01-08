import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUserDetailsQuery } from "../feature/auth/authApiSlice";
import { userLoggedIn, userLoggedOut } from "../feature/auth/authSlice";

export default function useAuthCheck() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authToken, setAuthToken] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    const localAuth = localStorage?.getItem("genomart_auth");
    
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      setAuthToken(auth?.token);
    } else {
      dispatch(userLoggedOut());
      localStorage.removeItem("genomart_auth");
    }
  }, []);
  
  const { data, isLoading, isError, isSuccess, error } =
    useUserDetailsQuery(authToken, {
      skip: !authToken,
      refetchOnReconnect: true,
    }) || {};

    useEffect(() => {
    if (!isLoading && isSuccess && !isError) {
      dispatch(
        userLoggedIn({
          token: authToken,
          user: data?.data,
        })
      );
    }
    if (!isLoading && error) {
      dispatch(userLoggedOut());
      localStorage.removeItem("genomart_auth");
    }

    setTimeout(() => {
      if (!isLoading) {
        setAuthChecked(true);
      }
    }, 1000);
  }, [
    dispatch,
    setAuthChecked,
    authToken,
    isError,
    isSuccess,
    data?.user,
    isLoading,
    error,
  ]);
  return authChecked;
}
