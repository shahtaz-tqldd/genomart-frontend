import React, { useState } from "react";
import ProductCardsm from "../../components/ProductCards/ProductCardSm";
import { IoGridOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import ProductCardList from "../../components/ProductCards/ProductCardList";
import { Box, Slider } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} from "../../feature/products/productsApiSlice";
import NotFound from "../../utiles/NotFound";
import useTitle from "../../hooks/useTitle";
import SearchInput from "../../ui/InputField/SearchInput";
import ProductCardSkeleton from "../../components/Skeletons/ProductCardSkeleton";
import ProductCardListSkeleton from "../../components/Skeletons/ProductCardListSkeleton";

const Products = () => {
  useTitle("Genomart Product List");
  const { state } = useLocation();
  const cat = state?.category || "";

  const [selectedCategory, setSelectedCategory] = useState([cat]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [value, setValue] = useState([20, 37]);

  const valuetext = (value) => {
    return `BDT ${value * 100}`;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isLoading, isSuccess, isError } = useGetAllProductsQuery(
    { page, limit: 12, category: selectedCategory[0], searchTerm },
    { refetchOnReconnect: true }
  );

  const { data: category } = useGetAllCategoriesQuery({
    refetchOnReconnect: true,
  });

  const [grid, setGrid] = useState(() => {
    const gridStored = localStorage.getItem("genomart_display_grid");
    return gridStored !== null ? gridStored === "true" : true;
  });

  const toggleGrid = () => {
    setGrid((prevGrid) => {
      const newGrid = !prevGrid;
      localStorage.setItem("genomart_display_grid", newGrid.toString());
      return newGrid;
    });
  };

  let content;

  const getNumberOfColumns = () => {
    if (window.innerWidth >= 1024) {
      return 8;
    } else if (window.innerWidth >= 768) {
      return 6;
    } else {
      return 4;
    }
  };

  if ((isLoading && !isSuccess) || isError) {
    content = grid ? (
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mt-8">
        {Array(getNumberOfColumns())
          .fill(null)
          .map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-6 mt-8">
        {Array(getNumberOfColumns())
          .fill(null)
          .map((_, i) => (
            <ProductCardListSkeleton key={i} />
          ))}
      </div>
    );
  } else if (!isLoading && isSuccess && !isError) {
    content =
      data?.meta?.total > 0 ? (
        grid ? (
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mt-8">
            {data?.data?.map((data, i) => (
              <ProductCardsm key={i} data={data} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 mt-8">
            {data?.data?.map((data, i) => (
              <ProductCardList key={i} data={data} />
            ))}
          </div>
        )
      ) : (
        <NotFound text={"No products found!"} />
      );
  }

  return (
    <div className="container mt-12 flex md:flex-row flex-col gap-12">
      <div className="lg:w-[25%] md:w-[40%] w-full lg:block md:block hidden h-full sticky top-28">
        <h2 className="text-xl font-medium mb-3">Product Status</h2>
        {["All Items", "On Stock", "New Arival"]?.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            {c}
          </div>
        ))}
        <h2 className="text-xl font-medium mb-3 mt-8">Price Range</h2>
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => "Price Range"}
            value={value}
            onChange={handleChange}
            getAriaValueText={valuetext}
          />
        </Box>
        <h2>
          Range : BDT {value[0] * 1000} - {value[1] * 1000}
        </h2>
        <h2 className="text-xl font-medium mb-3 mt-8">Product Categories</h2>
        {category?.data?.map((c, i) => (
          <div
            onClick={() => {
              selectedCategory.includes(c?.category)
                ? setSelectedCategory(
                    selectedCategory?.filter((s) => s !== c?.category)
                  )
                : setSelectedCategory([...selectedCategory, c?.category]);
            }}
            key={i}
            className="flex items-center justify-between gap-2 cursor-pointer mb-1"
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedCategory.includes(c?.category)}
              />
              {c?.category}
            </div>
            <span className="text-gray-400 ml-2 text-sm mt-0.5">
              {c?.totalProducts}
            </span>
          </div>
        ))}
      </div>
      <div className="lg:w-[75%] md:w-[60%] w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <IoGridOutline
              onClick={!grid && toggleGrid}
              className={`text-3xl p-1.5 rounded  border cursor-pointer ${
                grid
                  ? "bg-slate-800 text-white border-slate-800"
                  : "text-gray-600"
              }`}
            />
            <AiOutlineMenu
              onClick={grid && toggleGrid}
              className={`text-3xl p-1.5  rounded border cursor-pointer ${
                grid
                  ? "text-gray-600"
                  : "bg-slate-800 border-slate-800 text-white"
              }`}
            />
          </div>
          <SearchInput setSearchTerm={setSearchTerm} placeholder={"Products"} />
        </div>

        {content}
      </div>
    </div>
  );
};

export default Products;
