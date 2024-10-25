import { TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../ui/Heading/Heading";
import SubmitButton from "../../ui/Buttons/SubmitButton";
import useTitle from "../../hooks/useTitle";
import toast from "react-hot-toast";
import contactImg from "../../assets/images/contact.png";

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
    <div className="grid lg:grid-cols-2 grid-cols-1 container lg:my-32 my-24 gap-16">
      <div className="lg:block hidden">
        <img src={contactImg} alt="img" className="h-[500px] w-full object-contain" />
      </div>
      <div className="grid place-items-center">
        <div className="max-w-[540px] w-full border border-gray-200 bg-gradient-to-tr from-primary/10 to-rose-50 py-6 lg:px-10 md:px-8 px-5 rounded-xl">
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
              label="Contact Number"
              type="text"
              variant="standard"
              {...register("contact", { required: true })}
            />
            <TextField
              label="Message"
              multiline
              rows={6}
              type="text"
              variant="standard"
              {...register("message", { required: true })}
            />
            <div className="flex mt-8 justify-end">
              <SubmitButton name={"Send Message"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
