import { TextField } from "@mui/material";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../feature/users/usersApiSlice";
import toast from "react-hot-toast";
import { userLoggedIn } from "../../feature/auth/authSlice";
import { useDispatch } from "react-redux";

const Register = ({ setRegOpen, handleClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [createUser] = useCreateUserMutation() || {};
  const handleUserCreate = async (data) => {
    const res = await createUser({ bodyData: data });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      dispatch(
        userLoggedIn({
          token: res?.data?.data?.token,
          user: res?.data?.data?.user,
        })
      );
      handleClose();
    } else {
      toast.error(res?.error?.data?.message);
    }
  };
  return (
    <div className="grid grid-cols-5 justify-between relative">
      <div className="col-span-2 grid place-items-center rounded-xl bg-[#F4D3DA]">
        <img
          src="https://img.freepik.com/premium-vector/login-password-concept-3d-illustration-icon-composition-with-site-interface-with-secure-login-form-personal-online-account-social-media-profile-vector-illustration-modern-web-design_198565-1668.jpg?w=360"
          alt=""
          className="w-full"
        />
      </div>
      <div className="col-span-3 w-full px-8 py-2">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">Open a new Account</h2>
          <IoCloseOutline
            onClick={handleClose}
            className="absolute top-0 right-0 text-4xl p-1 rounded-full hover:bg-purple-200 cursor-pointer trasition duration-300"
          />
        </div>
        <form
          onSubmit={handleSubmit(handleUserCreate)}
          className="flex flex-col w-full gap-2 mt-2"
        >
          <TextField
            label="Full Name"
            type="text"
            variant="standard"
            {...register("fullname", { required: true })}
          />
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
          <button
            type="submit"
            className="bg-secondary hover:bg-primaryColor tr mt-4 py-2 w-full rounded-lg text-white"
          >
            Register
          </button>
        </form>

        <div className="text-sm flex items-center justify-center gap-3 my-3">
          <hr className="w-1/2" />
          or
          <hr className="w-1/2" />
        </div>
        <SocialLogin handleClose={handleClose} />

        <div className="flex gap-1 text-sm justify-center mt-5">
          Already have an account?
          <button onClick={() => setRegOpen(false)} className="text-orange-500">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
