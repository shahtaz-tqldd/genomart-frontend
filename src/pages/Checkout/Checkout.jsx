import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutProductCard from "../../components/ProductCards/CheckoutProductCard";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const [payment, setPayment] = useState("cash");
  const { cart, auth } = useSelector((state) => state);
  const subtotal = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const navigate = useNavigate();
  useEffect(() => {
    if (cart?.length <= 0) {
      console.log("true")
      navigate("/products");
    }
  }, [cart]);

  const handleConfirmOrder = (data) => {
    navigate("/orders/confirm", {
      state: {
        products: cart,
        customer: { ...data, id: auth?.user?._id },
        payment: { method: payment, total: subtotal },
      },
    });
  };

  const initialValues = {
    fullname: auth?.user?.fullname,
    email: auth?.user?.email,
    phone: auth?.user?.phone,
    house: auth?.user?.house,
    street: auth?.user?.street,
    address: auth?.user?.address,
  };
  const { register, handleSubmit } = useForm({ defaultValues: initialValues });
  return (
    <div className="container mt-36 grid grid-cols-2 gap-10">
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
          <h2 className="font-bold">${subtotal}.00</h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleConfirmOrder)}
        className="bg-gradient-to-tr from-primary/10 to-rose-50 rounded-xl py-5 px-10 h-fit"
      >
        <h2 className="text-2xl font-medium text-slate-800 mb-6">
          Billing Information
        </h2>
        <div className="flex flex-col gap-5">
          <TextField
            label="Full Name"
            type="text"
            variant="standard"
            {...register("fullname", { required: true })}
          />
          <div className="grid grid-cols-2 gap-5">
            <TextField
              label="Email"
              type="text"
              value={auth?.user?.email || null}
              variant="standard"
            />
            <TextField
              label="Phone Number"
              type="text"
              variant="standard"
              {...register("phone", { required: true })}
            />
          </div>
          <h2 className="text-lg font-medium mt-5 -mb-2">Address</h2>
          <div className="grid grid-cols-2 gap-5">
            <TextField
              label="House Number"
              type="text"
              variant="standard"
              {...register("house", { required: true })}
            />
            <TextField
              label="Road Name"
              type="text"
              variant="standard"
              {...register("street", { required: true })}
            />
          </div>
          <TextField
            label="Full Address"
            type="text"
            variant="standard"
            {...register("address", { required: true })}
          />
          <h2 className="text-lg font-medium mt-5 -mb-2">Payment</h2>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="cash"
            name="radio-buttons-group"
            onChange={(e, val) => {
              e.preventDefault();
              setPayment(val);
            }}
          >
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label="Cash on delivery"
            />
            <FormControlLabel
              value="online"
              control={<Radio />}
              label="Online Payment"
            />
          </RadioGroup>
        </div>
        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            className="py-2.5 bg-primary pl-8 pr-10 rounded-lg text-white flex items-center gap-2"
          >
            <FaRegCheckCircle />
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
