import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authModalClose } from "../../feature/auth/authModalSlice";
import Register from "./Register";
import Login from "./Login";

const AuthModal = () => {
  const dispatch = useDispatch();
  const [regOpen, setRegOpen] = useState(false);
  const { isOpen } = useSelector((state) => state?.authModal);
  const customDialogStyle = {
    borderRadius: "16px",
    maxWidth: "650px",
    width: "100%",
  };

  const handleClose = () => {
    dispatch(authModalClose());
  };

  return (
    <Dialog
      open={isOpen}
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
        <div>
          {!regOpen ? (
            <Login setRegOpen={setRegOpen} handleClose={handleClose} />
          ) : (
            <Register setRegOpen={setRegOpen} handleClose={handleClose} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
