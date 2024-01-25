import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Greetings from "../../../utiles/Greetings";
import useTitle from "../../../hooks/useTitle";
import LogoImage from "../../../ui/Images/LogoImage";
import SubmitButton from "../../../ui/Buttons/SubmitButton";
import ReactQuill from "react-quill";
import { quillModules } from "../../../utiles/constants/quill-modules";
import {
  useCreateInfoMutation,
  useGetSettingsInfoQuery,
} from "../../../feature/dashboard/dashboardApiSlice";
import toast from "react-hot-toast";

const InfoPage = () => {
  useTitle("Admin Dashboard | Settings");
  const { token, user } = useSelector((state) => state?.auth);
  const [terms, setTerms] = useState("");
  const [policy, setPolicy] = useState("");

  const { data:info, isSuccess } = useGetSettingsInfoQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (info?.success) {
      const initialValues = {
        name: info?.data?.name,
        email: info?.data?.email,
        contact: info?.data?.contact,
        location: info?.data?.location,
        description: info?.data?.description,
      };
      setSelectedImage(info?.data?.logo?.url);
      setPolicy(info?.data?.policy);
      setTerms(info?.data?.terms);
      reset(initialValues);
    }
  }, [info, reset]);

  const [createInfo, { isLoading }] = useCreateInfoMutation() || {};
  const handleProfileSubmit = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    if (terms) {
      formData.append("terms", terms);
    }
    if (policy) {
      formData.append("policy", policy);
    }
    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    const res = await createInfo({ bodyData: formData, token });

    if (res?.data?.success) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.error?.data?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleProfileSubmit)}>
      <Greetings page={"Settings"} />
      <div className="grid grid-cols-5 gap-14 mt-8">
        <div className="col-span-2">
          <LogoImage
            setSelectedFile={setSelectedFile}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            id={"logo"}
            maxSize={1}
          />
        </div>
        <div className="col-span-3 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <TextField
              label="Shop Name"
              type="text"
              InputLabelProps={{ shrink: info?.data?.name ? true : false }}
              {...register("name", { required: false })}
              variant="standard"
            />
            <TextField
              label="Contact"
              type="text"
              variant="standard"
              InputLabelProps={{ shrink: info?.data?.contact ? true : false }}
              {...register("contact", { required: false })}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <TextField
              label="Email"
              type="email"
              variant="standard"
              InputLabelProps={{ shrink: info?.data?.email ? true : false }}
              {...register("email", { required: false })}
            />
            <TextField
              label="Location"
              type="text"
              variant="standard"
              InputLabelProps={{ shrink: info?.data?.location ? true : false }}
              {...register("location", { required: false })}
            />
          </div>

          <TextField
            label="Description"
            type="text"
            multiline="true"
            maxRows={4}
            variant="standard"
            InputLabelProps={{ shrink: info?.data?.description ? true : false }}
            {...register("description", { required: false })}
          />
        </div>
      </div>
      {isSuccess && (
        <div className="grid grid-cols-2 gap-8 mt-10">
          <div>
            <h2 className="text-md mb-4 ml-1 text-slate-800 font-semibold">
              Privacy Policy
            </h2>
            <ReactQuill
              modules={quillModules}
              placeholder="Write Privacy Policy"
              theme="snow"
              className="custom-quill-editor"
              value={policy}
              onChange={(val) => setPolicy(val)}
            />
          </div>
          <div>
            <h2 className="text-md mb-4 ml-1 text-slate-800 font-semibold">
              Terms and Condtions
            </h2>
            <ReactQuill
              modules={quillModules}
              placeholder="Write Terms and Conditions"
              theme="snow"
              className="custom-quill-editor"
              value={terms}
              onChange={(val) => setTerms(val)}
            />
          </div>
        </div>
      )}
      <div className="flex justify-end mt-16">
        <SubmitButton loading={isLoading} name={"Save Changes"} />
      </div>
    </form>
  );
};

export default InfoPage;
