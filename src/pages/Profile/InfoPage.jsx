import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import SubmitButton from "../../ui/Buttons/SubmitButton";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import Heading from "../../ui/Heading/Heading";
import useTitle from "../../hooks/useTitle";
import { useUpdateUserMutation } from "../../feature/users/usersApiSlice";
import toast from "react-hot-toast";

const InfoPage = () => {
  useTitle("Profile | My Information");
  const { token, user } = useSelector((state) => state?.auth);
  const [passChange, setPassChange] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  
  const initialValues = {
    fullname: user?.fullname,
    email: user?.email,
    phone: user?.phone,
    house: user?.house,
    street: user?.street,
    address: user?.address,
  };

  const { register, handleSubmit } = useForm({ defaultValues: initialValues });

  const [updateUser, { isLoading }] = useUpdateUserMutation() || {};

  const handleProfileSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("house", data.house);
    formData.append("street", data.street);
    formData.append("address", data.address);

    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    if (passChange) {
      formData.append("currentPass", data.currentPass);
      formData.append("newPass", data.newPass);
    }

    const res = await updateUser({ bodyData: formData, id: user?._id, token });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-14">
      <div className="lg:col-span-2 col-span-5">
        <ProfileImage
          setSelectedFile={setSelectedFile}
          id={"profileImg"}
          currentImage={user?.image?.url || ""}
        />
      </div>
      <form
        onSubmit={handleSubmit(handleProfileSubmit)}
        className="lg:col-span-3 col-span-5 flex flex-col gap-5"
      >
        <Heading title={"My Information"} />

        <TextField
          label="Full Name"
          type="text"
          variant="standard"
          {...register("fullname", { required: true })}
        />

        <div className="grid grid-cols-2 gap-5">
          <TextField
            label="Email"
            type="text"
            value={user?.email || null}
            variant="standard"
          />
          <TextField
            label="Phone Number"
            type="text"
            variant="standard"
            {...register("phone", { required: false })}
          />
        </div>

        <h2 className="font-bold mt-5 -mb-2 text-slate-800">Address</h2>
               
        <div className="grid grid-cols-2 gap-5">
          <TextField
            label="House Number"
            type="text"
            variant="standard"
            {...register("house", { required: false })}
          />
          <TextField
            label="Road Name"
            type="text"
            variant="standard"
            {...register("street", { required: false })}
          />
        </div>
        
        <TextField
          label="Full Address"
          type="text"
          variant="standard"
          {...register("address", { required: false })}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            setPassChange(true);
          }}
          className="font-bold mt-5 -mb-2 text-slate-800 flex items-center gap-2"
        >
          Change Password
          <MdArrowDropDown className={"text-2xl"} />
        </button>
        
        {passChange && (
          <div className="grid grid-cols-2 gap-5">
            <TextField
              label="Current Password"
              type="password"
              variant="standard"
              {...register("currentPass", { required: false })}
            />
            <TextField
              label="New Password"
              type="password"
              variant="standard"
              {...register("newPass", { required: false })}
            />
          </div>
        )}

        <div className="flex justify-end mt-16">
          <SubmitButton loading={isLoading} name={"Save Changes"} />
        </div>
      </form>
    </div>
  );
};

export default InfoPage;
