import React from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../feature/auth/authSlice";
import toast from "react-hot-toast";
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
    <div className="flex gap-6 justify-center mt-3">
      <FaGoogle
        onClick={handleGoogleLogin}
        className="text-xl cursor-pointer text-red-500 hover:text-red-600 tr"
      />
      <FaFacebook className="text-xl cursor-pointer text-blue-600 hover:text-blue-700 tr" />
      <FaTwitter className="text-xl cursor-pointer text-blue-400 hover:text-blue-500 tr" />
    </div>
  );
};

export default SocialLogin;
