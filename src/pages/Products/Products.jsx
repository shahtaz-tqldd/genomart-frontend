import React, { useEffect, useState } from "react";
import { products } from "../../assets/data/mock/products";
import ProductCardsm from "../../components/ProductCards/ProductCardSm";
import { categories } from "../../assets/data/mock/categories";
import { IoGridOutline, IoSearch } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import ProductCardList from "../../components/ProductCards/ProductCardList";
import { Box, Slider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
} from "../../feature/products/productsApiSlice";
import NotFound from "../../utiles/NotFound";
import useTitle from "../../hooks/useTitle";
import SearchInput from "../../ui/InputField/SearchInput";

const Products = () => {
  useTitle('Genomart Product List')
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
    { page, limit:12, category: selectedCategory[0], searchTerm },
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

  return (
    <div className="container mt-12 flex gap-12">
      <div className="w-[25%] h-full sticky top-28">
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
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            // valueLabelDisplay="auto"
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
      <div className="w-[75%]">
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
          <SearchInput setSearchTerm={setSearchTerm} placeholder={'Products'} />
        </div>

        {data?.meta?.total > 0 ? (
          grid ? (
            <div className="grid grid-cols-4 gap-4 mt-8">
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
        )}
      </div>
    </div>
  );
};

export default Products;
