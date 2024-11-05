import React from "react";
import products from "../../../assets/images/products.png";
import Lordicon from "../../../utiles/Lordicon";

const TotalProductCard = ({ totalProducts, totalStock, totalCategories }) => {
  return (
    <div className="bg-primary rounded-xl h-full border border-[#ccc] flex flex-col">
      <div className="bg-white/20 m-4 p-6 rounded-3xl  flex-1">
        <div className="flex flex-col items-center justify-center z-10 mt-3">
          <Lordicon link={"qxqvtswi"} size={80} target={"div"} />
          <h1 className="text-center text-7xl font-bold text-white mt-3">
            {totalProducts < 9 && "0"}
            {totalProducts}
          </h1>
        </div>
        <h2 className="text-xl mt-4 uppercase text-white text-center tracking-widest">
          Total Product
        </h2>
      </div>

      <div className="w-full flex justify-between text-white p-8">
        <p>
          <strong className="text-3xl">{totalStock}</strong>
          <br />
          Total Stock
        </p>
        <p>
          <strong className="text-3xl">
            {totalCategories < 9 && "0"}
            {totalCategories}
          </strong>
          <br />
          Categories
        </p>
      </div>
    </div>
  );
};

export default TotalProductCard;
