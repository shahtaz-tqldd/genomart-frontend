import React from "react";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import Heading from "../../../ui/Heading/Heading";

const SpecialOfferProducts = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery(
    {},
    { refetchOnReconnect: true }
  );
  console.log(data?.data[2]?.numSold);
  console.log(data?.data[2]?.stock);
  console.log((3 / 230) * 100);
  console.log(`${(data?.data[2]?.numSold || 0 / data?.data[2]?.stock) * 100}%`);
  return (
    <div>
      <Heading title={"Special Offer"} />
      <div className="grid grid-cols-5 font-semibold">
        <div className="col-span-4 ml-6">Product</div>
        <div className="col-span-1 text-center">Stock</div>
      </div>
      <hr className="my-2" />
      {data?.data?.slice(0, 5)?.map((p, i) => (
        <a
          key={i}
          target="_blank"
          href={`/products/${p?._id}`}
          className="grid grid-cols-5 items-center mb-3 hover:bg-green-100 tr cursor-pointer pr-3 pl-1 py-1 rounded-lg"
        >
          <div className="col-span-4 flex items-start gap-4">
            <img
              src={p?.images[0]?.url}
              className="h-14 w-14 rounded-lg object-contain"
            />
            <div>
              <p className="text-xs text-gray-500">{p?.brand || "Not found"}</p>
              <h3 className="text-sm text-slate-800 font-semibold">
                {p?.name}
              </h3>
              <h3 className="text-xs mt-1 text-red-500">
                {p?.specialOffer || "Special Offer"}
              </h3>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-end text-xs mb-1 -mt-2">
              {p?.numSold || 0}/{p?.stock || 0}
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-[5px] bg-orange-200">
                <div
                  style={{ width: `${(p?.numSold / p?.stock) * 100}%` }}
                  className="bg-orange-500 h-[5px]"
                ></div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default SpecialOfferProducts;
