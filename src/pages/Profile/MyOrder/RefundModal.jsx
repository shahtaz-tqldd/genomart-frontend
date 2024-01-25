import React from "react";
import { Checkbox, Dialog, DialogContent, TextField } from "@mui/material";
import LoadingButton from "../../../ui/Buttons/LoadingButton";

const RefundModal = ({ isOpen, setIsOpen, data }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleClose = () => setIsOpen(null);
  const customDialogStyle = {
    borderRadius: "16px",
    maxWidth: "650px",
    width: "100%",
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
          Order Refund
        </div>
        <a
          href={"/policy"}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 underline flex justify-center hover:text-blue-500 tr"
        >
          See Refund Policy
        </a>

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
              <div className="col-span-3 flex items-center gap-1 -ml-2">
                <Checkbox {...label} />
                <div>
                  <h2 className="text-sm font-bold">{productId?.name}</h2>
                  <h4 className="text-xs font-semibold text-secondary">
                    {productId?.brand}
                  </h4>
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
            maxRows={10}
            placeholder="Explain your reason"
            variant="standard"
            className="w-full"
            label="Refund Reason"
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

export default RefundModal;
