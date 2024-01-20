import React from "react";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import Heading from "../../../ui/Heading/Heading";

const TopSoldProducts = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery(
    {},
    { refetchOnReconnect: true }
  );

  return (
    <div>
      <Heading title={"Top sold products"} />
      <div className="grid grid-cols-7 font-semibold">
        <div className="col-span-3 ml-4">Product</div>
        <div className="col-span-2 text-center">Category</div>
        <div className="col-span-1 text-center">Total sold</div>
        <div className="col-span-1 text-end">Stock</div>
      </div>
      <hr className="my-2"/>
      {data?.data?.slice(1, 7)?.map((p, i) => (
        <a key={i} target="_blank" href={`/products/${p?._id}`} className="grid grid-cols-7 items-center mb-3 hover:bg-green-100 tr cursor-pointer p-1 rounded-lg">
          <div className="col-span-3 flex items-start gap-4">
            <img
              src={p?.images[0]?.url}
              className="h-12 w-12 rounded-lg object-contain"
            />
            <div>
              <h3 className="text-sm font-semibold">{p?.name}</h3>
              <p className="text-xs text-gray-500">{p?.brand || "Not found"}</p>
            </div>
          </div>
          <div className="col-span-2 text-center text-xs">{p?.category}</div>
          <div className="col-span-1 text-center text-sm font-bold">
            {p?.totalSold || 12}
          </div>
          <div className="col-span-1 text-end mr-2 text-sm">
            {p?.stock || 0}
          </div>
        </a>
      ))}
    </div>
  );
};

export default TopSoldProducts;
