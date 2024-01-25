import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading/Heading";
import SubmitButton from "../../ui/Buttons/SubmitButton";
import useTitle from "../../hooks/useTitle";
import toast from "react-hot-toast";
const contactImg =
  "https://design4users.com/wp-content/uploads/2020/02/3d-art-google-partners.jpg";

const ContactPage = () => {
  useTitle("Contact");
  const { register, handleSubmit, reset } = useForm();
  const handleMessageSent = (data) => {
    if (data) {
      toast.success("Your message has been sent");
      reset();
    }
  };
  return (
    <div className="grid lg:grid-cols-2 h-[92vh] -mb-16">
      <div className="">
        <img
          src={contactImg}
          alt="img"
          className="h-[92vh] w-full object-cover"
        />
      </div>
      {/* <div className="bg-[#AFAFAF] grid place-items-center">
        <img src={contactImg} alt="img" className="max-h-[400px] h-full" />
      </div> */}
      <div className="grid place-items-center bg-gray-50">
        <div className="max-w-[500px] w-full bg-white py-6 px-10 rounded-xl shadow">
          <Heading title={"Write us your message"} />

          <form
            onSubmit={handleSubmit(handleMessageSent)}
            className="mt-6 flex flex-col gap-2.5"
          >
            <TextField
              label="Your Name"
              type="text"
              variant="standard"
              {...register("name", { required: true })}
            />
            <TextField
              label="Email"
              type="email"
              variant="standard"
              {...register("email", { required: true })}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              type="text"
              variant="standard"
              {...register("message", { required: true })}
            />
            <div className="flex mt-8 justify-end">
              <SubmitButton
                name={"Send"}
                // loading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
