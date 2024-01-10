import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../feature/orders/ordersApiSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../feature/cart/cartSlice";

const ConfirmOrder = () => {
  const { state } = useLocation();
  const { token } = useSelector((state) => state?.auth);
  const { products, customer, payment } = state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading }] = useCreateOrderMutation() || {};
  const handleSubmit = async () => {
    const bodyData = {
      products: products?.map((p) => ({
        productId: p._id,
        color: p?.color || null,
        size: p?.size || null,
      })),
      customer,
      payment,
    };
    const res = await createOrder({ bodyData, token });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      dispatch(clearCart());
      navigate("/");
    } else {
      toast.error(res?.error?.data?.message);
    }
  };

  return (
    <div className="max-w-[860px] mx-auto px-4 mt-12">
      <h2 className="text-2xl text-center mb-10 font-bold">Preview Order</h2>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          {products?.map((p, i) => (
            <div key={i}>
              <h2 className="font-bold text-lg">
                {i + 1}. {p?.name}
              </h2>
              <div className="flex items-center gap-6 text-sm mt-2 text-gray-500">
                <p>
                  Qunatity :{" "}
                  <strong className="text-gray-700">{p?.quantity}</strong>
                </p>
                <p className="flex items-center gap-3">
                  Color :{" "}
                  <div className="bg-green-500 h-3 w-3 rounded-full"></div>
                </p>
                <p>
                  Size : <strong className="text-gray-700">28 cm</strong>
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm mt-1 text-gray-500">
                Price :{" "}
                <strong className="text-gray-700">
                  $ {p?.price} x {p?.quantity} = ${p?.price * p?.quantity}{" "}
                </strong>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div>
            <h1>Name : {customer?.fullname}</h1>
            <h1>Email : {customer?.email}</h1>
            <h1>Phone : {customer?.phone}</h1>
            <h1>House : {customer?.house}</h1>
            <h1>Street : {customer?.street}</h1>
            <h1>Address : {customer?.address}</h1>
          </div>
          <hr className="my-5" />
          <div>
            <h1>
              Total : <strong>${payment?.total}</strong>
            </h1>
            <h1>
              Payment : <strong>{payment?.method}</strong>
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleSubmit}
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
