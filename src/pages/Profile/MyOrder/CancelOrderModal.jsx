import React from "react";
import {
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import moment from "moment";
import LoadingButton from "../../../ui/Buttons/LoadingButton";

const CancelOrderModal = ({ isOpen, setIsOpen, data }) => {
  const customDialogStyle = {
    borderRadius: "16px",
    maxWidth: "650px",
    width: "100%",
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const handleSubmit = () => {};

  return (
    <Dialog
      open={Boolean(isOpen)}
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
        <div className="text-xl font-bold text-slate-700 text-center mb-2">
          Cancel Order
        </div>

        <div className="mt-6 mb-6">
          <hr className="mb-2" />
          <div className="grid grid-cols-5 gap-4 text-sm font-semibold">
            <div className="col-span-3">Products</div>
            <div className="col-span-1 text-center">Size</div>
            <div className="col-span-1 text-center">Color</div>
          </div>
          <hr className="my-2" />
          {data?.products?.map(({ productId, quantity, color, size }, i) => (
            <div key={i} className="grid grid-cols-5 items-center gap-4 mb-2.5">
              <div className="col-span-3">
                <div>
                  <h2 className="text-sm font-bold">{productId?.name}</h2>
                  <h2 className="text-xs font-semibold text-secondary">
                    {productId?.brand}
                  </h2>
                </div>
              </div>
              <div className="col-span-1 text-sm text-center">{size}</div>
              <div className="col-span-1 flex justify-center">
                <div
                  style={{ backgroundColor: color }}
                  className="h-4 w-4 rounded-full"
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <TextField
            type="text"
            multiline
            maxRows={5}
            placeholder="Explain your reason"
            variant="standard"
            className="w-full"
            label="Cancel Reason"
          />
        </div>

        <div className="mt-10 flex justify-end">
          <LoadingButton
            name={"Submit"}
            // loading={isLoading}
            onClick={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelOrderModal;
