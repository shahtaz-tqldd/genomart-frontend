import React from "react";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import SubmitButton from "../../ui/Buttons/SubmitButton";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AskQuestionModal = ({ open, setOpen }) => {
  const customDialogStyle = {
    borderRadius: "16px",
    maxWidth: "580px",
    width: "100%",
  };

  const handleClose = () => {
    setOpen(null);
  };

  const { register, handleSubmit, reset } = useForm();
  const handleAskQuestion = (data) => {
    if (data) {
      toast.success("Your message has been sent");
      reset();
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: "rounded-lg",
        root: "rounded-lg",
      }}
      PaperProps={{ style: customDialogStyle }}
    >
      <DialogContent>
        {/* <Heading title={""} /> */}
        <h2 className="text-2xl font-semibold">
          Ask a question about this product
        </h2>
        <p className="text-black/70 mt-2 text-sm">
          Your queries will be answered by 24hours. You might find it in your
          profile's{" "}
          <Link to={"/profile/response"} className="text-red-500 font-medium">
            Response
          </Link>{" "}
          Section
        </p>
        <form
          onSubmit={handleSubmit(handleAskQuestion)}
          className="mt-4 flex flex-col"
        >
          <TextField
            label="Write your queries"
            multiline
            rows={6}
            type="text"
            variant="standard"
            {...register("message", { required: true })}
          />
          <div className="flex mt-8 justify-end">
            <SubmitButton name={"Submit"} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AskQuestionModal;
