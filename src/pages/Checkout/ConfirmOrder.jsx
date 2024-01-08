import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ConfirmOrder = () => {
  const { state } = useLocation();
  const { products, customer, payment } = state || {};
  return (
    <div className="max-w-[860px] mx-auto px-4 mt-12">
      <h2 className="text-2xl text-center mb-10 font-bold">Preview Order</h2>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          {products?.map((p, i) => (
            <div key={i}>
              <h2 className="font-bold text-lg">{p?.name}</h2>
              <div className="flex items-center gap-6 text-sm mt-2">
                <p>
                  Qunatity : <strong>{p?.quantity}</strong>
                </p>
                <p className="flex items-center gap-3">
                  Color :{" "}
                  <div className="bg-green-500 h-3 w-3 rounded-full"></div>
                </p>
                <p>
                  Size : <strong>28 cm</strong>
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm mt-1">
                Price :{" "}
                <strong>
                  $ {p?.price} x {p?.quantity} = ${p?.price * p?.quantity}{" "}
                </strong>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div>
            <h1>Name : {customer?.name}</h1>
            <h1>Address : {customer?.address}</h1>
          </div>
          <hr className="my-5" />
          <div>
            <h1>Total : <strong>${payment?.total}</strong></h1>
            <h1>Payment : <strong>{payment?.method}</strong></h1>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <button
          // onClick={handleConfirmOrder}
          className="py-2 bg-primaryColor pl-8 pr-10 rounded-lg text-white flex items-center gap-2"
        >
          <FaRegCheckCircle />
          Submit
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
