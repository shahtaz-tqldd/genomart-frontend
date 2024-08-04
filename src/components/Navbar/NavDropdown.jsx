import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../feature/products/productsApiSlice";

const NavDropdown = ({ isOpen, setIsOpen }) => {
  const { data } = useGetAllCategoriesQuery({
    refetchOnReconnect: true,
  });

  const navigate = useNavigate();
  const handleNavigateProduct = (name) => {
    navigate("/products", { state: { category: name } });
    setIsOpen(false);
  };
  return (
    <div className="w-4/6 h-[20rem] left-1/2 -translate-x-1/2 absolute -mt-5 rounded-xl z-[20]">
      <div className="w-full h-5 bg-transparent"></div>
      <div
        className="w-full h-full shadow border p-6 bg-gradient-to-bl from-[#232323] to-[#2f3e46] border-white/20 rounded-xl"
        style={{
          opacity: isOpen ? "1" : "0",
          transition: "opacity 0.5s",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <h2 className="text-2xl">Product Categories</h2>
        <hr className=" mt-2 mb-5 w-[220px] border border-white/30"></hr>
        <div className="flex flex-wrap gap-x-20 gap-y-6">
          {data?.data?.map(({image, category, totalProducts}, i) => (
            <div
              onClick={() => handleNavigateProduct(category)}
              key={i}
              className="cursor-pointer w-fit text-white/60 hover:text-white tr flex items-center gap-2 text-xl"
            >
              <img src={image} alt="" className="h-7 w-7"/>
              {category}
              <span className="text-gray-400 ml-2 text-sm mt-0.5">
                ({totalProducts})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
