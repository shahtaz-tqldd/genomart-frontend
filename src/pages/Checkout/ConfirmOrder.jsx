import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../feature/orders/ordersApiSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../feature/cart/cartSlice";
import LoadingButton from "../../ui/Buttons/LoadingButton";

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
        productId: p?._id,
        color: p?.selectedColor || null,
        size: p?.selectedSize || null,
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
      <h2 className="text-2xl text-center font-bold text-slate-800">
        Preview Order
      </h2>
      <div className="border border-gray-500 w-20 mx-auto mb-10 mt-3"></div>
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          {products?.map((p, i) => (
            <div key={i}>
              <h2 className="font-bold text-lg text-slate-800">
                {i + 1}. {p?.name}
              </h2>
              <div className="flex items-center gap-6 text-sm mt-2 text-gray-500">
                <p>
                  Qunatity :{" "}
                  <strong className="text-gray-700">{p?.quantity}</strong>
                </p>
                {p?.selectedColor && (
                  <p className="flex items-center gap-3">
                    Color :{" "}
                    <div
                      style={{ backgroundColor: p?.selectedColor }}
                      className="h-3 w-3 rounded-full"
                    ></div>
                  </p>
                )}
                {p?.selectedSize && (
                  <p>
                    Size :{" "}
                    <strong className="text-gray-700">{p?.selectedSize}</strong>
                  </p>
                )}
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
            <strong>{customer?.fullname}</strong>
            <p className="text-sm text-gray-700">Email : {customer?.email}</p>
            <p className="text-sm text-gray-700">Phone : {customer?.phone}</p>
            <h2 className="text-lg font-semibold mt-5">Address</h2>
            <p>
              House {customer?.house}, {customer?.street}
            </p>
            <p>{customer?.address}</p>
          </div>
          <hr className="my-5" />
          <div>
            <h1>
              Subtotal : <strong>${payment?.total}</strong>
            </h1>
            <h1>
              Payment Method: <strong>{payment?.method}</strong>
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <LoadingButton
          onClick={handleSubmit}
          loading={isLoading}
          name={"Submit"}
        />
      </div>
    </div>
  );
};

export default ConfirmOrder;
