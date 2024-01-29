import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../feature/auth/authSlice";
import toast from "react-hot-toast";
import googleImg from "../../assets/images/google.png";
import { useUserSocialLoginMutation } from "../../feature/auth/authApiSlice";
const auth = getAuth(app);

const SocialLogin = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [userSocialLogin] = useUserSocialLoginMutation();
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const data = {
        fullname: res?.user?.displayName,
        email: res?.user?.email,
        photoURL: res?.user?.photoURL,
      };
      const response = await userSocialLogin({ bodyData: data });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(
          userLoggedIn({
            token: response?.data?.data?.token,
            user: response?.data?.data?.user,
          })
        );
        handleClose();
      } else {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Error during Google login");
    }
  };

  return (
    <div
      onClick={handleGoogleLogin}
      className="flex items-center gap-2 justify-center text-sm font-semibold cursor-pointer border py-2.5 rounded-lg hover:bg-slate-800 hover:text-white tr"
    >
      <img src={googleImg} alt="" className="h-4 w-4" />
      Continue with Google
    </div>
  );
};

export default SocialLogin;
