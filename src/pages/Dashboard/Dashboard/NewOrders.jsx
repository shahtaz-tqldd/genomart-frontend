import React from "react";
import Heading from "../../../ui/Heading/Heading";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../../../feature/orders/ordersApiSlice";
import { duration } from "../../../utiles/functions/duration";

const NewOrders = () => {
  const { token } = useSelector((state) => state?.auth);

  const { data, isLoading, isSuccess, isError } = useGetAllOrdersQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );

  return (
    <div>
      <Heading title={"New Orders"} />
      <div className="grid grid-cols-6 font-semibold">
        <div className="col-span-1 ml-4">Order</div>
        <div className="col-span-2 ">Customer</div>
        <div className="col-span-2 text-center">Products</div>
        <div className="col-span-1 text-end mr-2">Time</div>
      </div>
      <hr className="my-2" />
      {data?.data?.slice(1, 7)?.map((order, i) => (
        <a
          key={i}
          target="_blank"
          href={`/products/${order?._id}`}
          className="grid grid-cols-6 items-center hover:bg-green-100 tr cursor-pointer px-1 py-2 rounded-lg border-b"
        >
          <div className="col-span-1 text-sm font-bold ml-2">
            {order?.orderSl}
          </div>

          <div className="col-span-2 flex flex-col items-start">
            <h2 className="font-bold text-sm">{order?.user?.fullname}</h2>
            <h2 className="text-xs mt-1">{order?.user?.address}</h2>
          </div>
          <div className="col-span-2 text-center text-xs">
            {order?.products?.map(({ productId, color, size }, i) => (
              <h2 key={i} className="text-slate-800">
                <strong>{i + 1}.</strong> {productId?.name}
                {order?.products?.length > i+1 && ", "}
              </h2>
            ))}
          </div>
          <div className="col-span-1 text-end mr-2 text-xs">
            {duration(order?.createdAt)}
          </div>
        </a>
      ))}
    </div>
  );
};

export default NewOrders;
