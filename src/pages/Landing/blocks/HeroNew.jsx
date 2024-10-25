import React from "react";
import GridBackground from "../../../ui/Elements/Grid";
import { useGetAllProductsQuery } from "../../../feature/products/productsApiSlice";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

const HeroNew = () => {
  const { data } = useGetAllProductsQuery(
    { tags: ["hero"] },
    { refetchOnReconnect: true }
  );
  const { name, price, images, brand, discount, _id } = data?.data[2] || {};
  return (
    <section className="h-screen bg-gradient-to-tr from-primary/10 to-rose-50 relative center">
      <GridBackground />
      <div className="container grid grid-cols-2 gap-16 items-center relative z-10 mt-10">
        <div>
          <div className="py-1 px-4 rounded-full bg-rose-500/10 text-sm text-rose-500 font-medium border border-rose-500/20 w-fit">
            {brand || "Nebula Watch"}
          </div>
          <h2 className="text-6xl mt-3">{name}</h2>
          <div className="mt-10 flex items-end gap-3">
            <h4 className="text-4xl font-black">${price}.00</h4>
            <p className="text-red-500 mb-0.5 text-sm font-bold">
              Save Upto {discount}%
            </p>
          </div>
          <div className="mt-16 flex">
            <Link to={`/products/${_id}`} className="bg-emerald-500 hover:bg-black py-2 px-7 font-medium rounded-full tr text-white">
              Buy Now
            </Link>
            <Link
              to="/products"
              className="py-2 px-6 rounded-full tr text-emerald-500 fl gap-2 font-medium hover:text-black"
            >
              Discover more Products
              <MdArrowOutward/>
            </Link>
          </div>
        </div>
        <div className="relative group">
          {/* The image */}
          <img
            src={images?.length && images[0]?.url}
            alt={name}
            className="p-10"
          />

          <div className="opacity-0 group-hover:opacity-100 transition duration-1000 absolute top-4 -left-6 flex flex-col items-center">
            <div className="bg-white p-3 rounded-lg shadow-md border border-black/10 w-64">
              <p className="text-black/75 text-sm ">
                20% Genomart products get wonderful Speaker and solid sound!
              </p>
            </div>

            <div className="flex flex-row items-end ml-20">
              <hr className="h-24 border border-green-500" />
              <div className="flex items-center -mb-1">
                <hr className="w-24 border border-green-400" />
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition duration-700 absolute top-20 -right-10 flex flex-col items-center">
            <div className="bg-white p-3 rounded-lg shadow-lg border border-black/10 w-64">
              <p className="text-black/75 text-sm">
                New Arizona Sound Effect at best price!
              </p>
            </div>

            <div className="flex flex-row items-end mr-20">
              <div className="flex items-center -mb-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <hr className="w-24 border border-green-400" />
              </div>
              <hr className="h-28 border border-green-500" />
            </div>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition duration-300 absolute bottom-6 -right-10 flex flex-row items-center">
            <div className="flex flex-row items-end -mt-28">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <hr className="h-24 border border-green-500" />
              </div>
              <hr className="w-16 border border-green-400 -ml-1" />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-lg border border-black/10 w-64">
              <p className="text-black/75 text-sm">
                New Arizona Sound Effect at best price!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
