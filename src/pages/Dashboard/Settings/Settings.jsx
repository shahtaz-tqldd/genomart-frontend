import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
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
import Heading from "../../../ui/Heading/Heading";

const InfoPage = () => {
  useTitle("Admin Dashboard | Settings");
  const { token } = useSelector((state) => state?.auth);
  const [terms, setTerms] = useState("");
  const [policy, setPolicy] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const { data: info, isSuccess } = useGetSettingsInfoQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      location: "",
      description: "",
    }
  });

  useEffect(() => {
    if (info?.success) {
      const initialValues = {
        name: info?.data?.name || "",
        email: info?.data?.email || "",
        contact: info?.data?.contact || "",
        location: info?.data?.location || "",
        description: info?.data?.description || "",
      };
      setSelectedImage(info?.data?.logo?.url);
      setPolicy(info?.data?.policy || "");
      setTerms(info?.data?.terms || "");
      reset(initialValues);
    }
  }, [info, reset]);

  const [createInfo, { isLoading }] = useCreateInfoMutation() || {};

  const handleProfileSubmit = async (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    if (terms) formData.append("terms", terms);
    if (policy) formData.append("policy", policy);
    if (selectedFile) formData.append("logo", selectedFile);

    try {
      const res = await createInfo({ bodyData: formData, token });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error("An error occurred while saving changes");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleProfileSubmit)} className="space-y-6">
      <Heading title="Settings" />
      <div className="grid grid-cols-5 gap-6 mt-2">
        <div className="col-span-2">
          <LogoImage
            setSelectedFile={setSelectedFile}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            id="logo"
            maxSize={1}
          />
        </div>
        <div className="col-span-3 flex flex-col gap-5 bg-white p-5 rounded-xl border border-primary/20">
          <div className="grid grid-cols-2 gap-5">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Shop Name"
                  variant="standard"
                  fullWidth
                />
              )}
            />
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact"
                  variant="standard"
                  fullWidth
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  variant="standard"
                  fullWidth
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Location"
                  variant="standard"
                  fullWidth
                />
              )}
            />
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                maxRows={4}
                variant="standard"
                fullWidth
              />
            )}
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
              Terms and Conditions
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

      <div className="flex justify-end">
        <SubmitButton loading={isLoading} name="Save Changes" />
      </div>
    </form>
  );
};

export default InfoPage;