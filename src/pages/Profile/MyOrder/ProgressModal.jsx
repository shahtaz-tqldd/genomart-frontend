import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import moment from "moment";

const ProgressModal = ({ isOpen, setIsOpen, data }) => {
  const customDialogStyle = {
    borderRadius: "16px",
    maxWidth: "650px",
    width: "100%",
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  const activeStep = () => {
    if (data?.status === "pending") return 1;
    if (data?.status === "processing") return 2;
    if (data?.status === "onTheWay") return 3;
    if (data?.status === "completed") return 4;
  };

  const steps = ["Pending", "Processing", "On the way", "Delivered"];

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
          Order Progress
        </div>
        <h2 className="text-xs text-gray-500 text-center mb-7">
          {data?.deliveryDate ? (
            <span>
              Delivered :{" "}
              {moment(data?.deliveryDate).format("DD MMM YYYY")}
            </span>
          ) : (
            <span>
              Possible delivery :{" "}
              {moment(data?.createdAt).add(3, "days").format("DD MMM YYYY")}
            </span>
          )}
        </h2>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep()} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <div className="mt-14 mb-6">
          <hr className="mb-2" />
          <div className="grid grid-cols-5 gap-4 text-sm font-semibold">
            <div className="col-span-3 ml-3">Products</div>
            <div className="col-span-1 text-center">Size</div>
            <div className="col-span-1 text-center">Color</div>
          </div>
          <hr className="my-2" />
          {data?.products?.map(({ productId, quantity, color, size }, i) => (
            <div key={i} className="grid grid-cols-5 items-center gap-4 mb-2.5">
              <div className="col-span-3 flex gap-4 items-center">
                <img
                  src={productId?.images[0]?.url}
                  className="h-16 w-16 rounded object-contain"
                  alt=""
                />
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
      </DialogContent>
    </Dialog>
  );
};

export default ProgressModal;
