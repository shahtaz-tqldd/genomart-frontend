import React from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

const SocialLogin = () => {
  return (
    <div className="flex gap-6 justify-center mt-3">
      <FaGoogle className="text-xl cursor-pointer text-red-500 hover:text-red-600 tr" />
      <FaFacebook className="text-xl cursor-pointer text-blue-600 hover:text-blue-700 tr" />
      <FaTwitter className="text-xl cursor-pointer text-blue-400 hover:text-blue-500 tr" />
    </div>
  );
};

export default SocialLogin;
