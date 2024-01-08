import { TextField } from "@mui/material";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import SocialLogin from "./SocialLogin";
import { useUserLoginMutation } from "../../feature/auth/authApiSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Login = ({ setRegOpen, handleClose }) => {
  const { register, handleSubmit } = useForm();

  const [userLogin] = useUserLoginMutation() || {};
  
  const handleLogin = async (data) => {
    const res = await userLogin({ bodyData: data });
    console.log(res?.data)
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      handleClose()
    } else {
      toast.error(res?.error?.data?.message);
    }
  };
  return (
    <div className="grid grid-cols-5 justify-between relative">
      <div className="col-span-2 grid place-items-center rounded-xl bg-[#BEDDF9]">
        <img
          src="https://img.freepik.com/premium-vector/folder-protected-3d-concept-vector-illustration_647434-1033.jpg"
          alt=""
          className="w-full"
        />
      </div>
      <div className="col-span-3 w-full px-8 py-2">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">Login to Genomart</h2>
          <IoCloseOutline
            onClick={handleClose}
            className="absolute top-0 right-0 text-4xl p-1 rounded-full hover:bg-purple-200 cursor-pointer trasition duration-300"
          />
        </div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col w-full gap-2 my-5"
        >
          <TextField
            label="Email"
            type="email"
            variant="standard"
            {...register("email", { required: true })}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            {...register("password", { required: true })}
          />
          <div className="flex justify-end mb-5">
            <button
              onClick={(e) => e.preventDefault()}
              className="text-xs text-blue-600"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="bg-primaryColor hover:bg-secondary tr py-2 w-full rounded-lg text-white"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">or continue with</p>
        <SocialLogin />

        <div className="flex gap-1 text-sm justify-center mt-7">
          New to genomart?
          <button onClick={() => setRegOpen(true)} className="text-orange-500">
            Open Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
