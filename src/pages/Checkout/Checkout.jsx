import React from "react";
import { useSelector } from "react-redux";
import CheckoutProductCard from "../../components/ProductCards/CheckoutProductCard";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state?.cart);
  const subtotal = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const navigate = useNavigate();
  const handleConfirmOrder = () => {
    navigate("/orders/confirm", {
      state: {
        products: cart,
        customer: { name: "rahim", address: "hem" },
        payment: { method: "Cash On Deliver", total:subtotal },
      },
    });
  };
  return (
    <div className="container mt-12 grid grid-cols-2 gap-10">
      <div>
        <h2 className="text-2xl font-medium text-slate-800 mb-6">
          Product Details
        </h2>
        <div className="flex flex-col gap-5">
          {cart?.map((data, i) => (
            <CheckoutProductCard key={i} data={data} />
          ))}
        </div>
        <hr className="mt-12 mb-4" />
        <div className="flex justify-between text-xl mb-4 px-2">
          <h2>Subtotal</h2>
          <h2 className="font-bold">${subtotal}</h2>
        </div>
      </div>
      <div className="bg-gray-100 rounded-xl py-5 px-10 h-fit">
        <h2 className="text-2xl font-medium text-slate-800 mb-6">
          Billing Information
        </h2>
        <div className="flex flex-col gap-5">
          <TextField
            id=""
            size="sm"
            label="Full Name"
            type="text"
            variant="standard"
          />
          <div className="grid grid-cols-2 gap-5">
            <TextField
              id=""
              size="small"
              label="Email"
              type="text"
              variant="standard"
            />
            <TextField
              id=""
              size="small"
              label="Phone Number"
              type="text"
              variant="standard"
            />
          </div>
          <h2 className="text-lg font-medium mt-5 -mb-2">Address</h2>
          <div className="grid grid-cols-2 gap-5">
            <TextField
              id=""
              size="small"
              label="House Number"
              type="text"
              variant="standard"
            />
            <TextField
              id=""
              size="small"
              label="Road Name"
              type="text"
              variant="standard"
            />
          </div>
          <TextField
            id=""
            size="small"
            label="Full Address"
            type="text"
            variant="standard"
          />
          <h2 className="text-lg font-medium mt-5 -mb-2">Payment</h2>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="cashOnDelivery"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="cashOnDelivery"
              control={<Radio />}
              label="Cash on delivery"
            />
            <FormControlLabel
              value="paymentMethod"
              control={<Radio />}
              label="Online Payment"
            />
          </RadioGroup>
        </div>
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleConfirmOrder}
            className="py-2.5 bg-primaryColor pl-8 pr-10 rounded-lg text-white flex items-center gap-2"
          >
            <FaRegCheckCircle />
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
