import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCards/ProductCard";
import ProductCardList from "../../components/ProductCards/ProductCardList";
import { IoGridOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { Box, Checkbox, FormControlLabel, Slider } from "@mui/material";
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
  const cat = state?.category;

  // State management
  const [selectedCategory, setSelectedCategory] = useState(cat ? [cat]: []);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([120, 450]);
  const [productStatus, setProductStatus] = useState({
    all: true,
    inStock: false,
    newArrival: false
  });

  // Grid/List view state
  const [grid, setGrid] = useState(() => {
    const gridStored = localStorage.getItem("genomart_display_grid");
    return gridStored !== null ? gridStored === "true" : true;
  });

  // RTK Query hooks
  const { data, isLoading, isSuccess, isError, refetch } = useGetAllProductsQuery(
    { 
      page, 
      limit: 12, 
      category: selectedCategory[0], 
      searchTerm,
      // minPrice: priceRange[0],
      // maxPrice: priceRange[1],
      status: Object.entries(productStatus)
        .filter(([_, value]) => value)
        .map(([key]) => key)
    },
    { 
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true 
    }
  );

  const { data: category } = useGetAllCategoriesQuery({
    refetchOnReconnect: true,
  });

  // Handlers
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleStatusChange = (status) => {
    if (status === 'all') {
      setProductStatus({
        all: true,
        inStock: false,
        newArrival: false
      });
    } else {
      setProductStatus(prev => ({
        ...prev,
        all: false,
        [status]: !prev[status]
      }));
    }
  };

  const toggleGrid = () => {
    setGrid((prevGrid) => {
      const newGrid = !prevGrid;
      localStorage.setItem("genomart_display_grid", newGrid.toString());
      return newGrid;
    });
  };

  // Styles
  const muiStyles = {
    checkbox: {
      color: "#10b981",
      "&.Mui-checked": {
        color: "#10b981",
      },
    },
    label: {
      "& .MuiFormControlLabel-label": {
        fontSize: "0.875rem",
        color: "#1f2937",
      },
    },
    slider: {
      color: "#10b981",
      "& .MuiSlider-thumb": {
        backgroundColor: "#10b981",
      },
      "& .MuiSlider-track": {
        backgroundColor: "#10b981",
      },
      "& .MuiSlider-rail": {
        backgroundColor: "#10b98160",
      },
    }
  };

  // Content rendering logic
  const renderContent = () => {
    if ((isLoading && !isSuccess) || isError) {
      return grid ? (
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
    }

    if (!isLoading && isSuccess && !isError) {
      if (data?.meta?.total > 0) {
        return grid ? (
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mt-8">
            {data?.data?.map((item, i) => (
              <ProductCard key={i} data={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 mt-8">
            {data?.data?.map((item, i) => (
              <ProductCardList key={i} data={item} />
            ))}
          </div>
        );
      }
      return <NotFound text={"No products found!"} />;
    }
  };

  const getNumberOfColumns = () => {
    if (window.innerWidth >= 1024) return 8;
    if (window.innerWidth >= 768) return 6;
    return 4;
  };

  return (
    <div className="container mt-28 flex md:flex-row flex-col gap-12 min-h-screen">
      {/* Filters Sidebar */}
      <div className="lg:w-[25%] md:w-[40%] w-full lg:block md:block hidden h-full sticky top-28">
        {/* Product Status */}
        <h2 className="text-xl font-medium mb-3">Product Status</h2>
        {[
          { key: 'all', label: 'All Items' },
          { key: 'inStock', label: 'On Stock' },
          { key: 'newArrival', label: 'New Arrival' }
        ].map(({ key, label }) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={productStatus[key]}
                onChange={() => handleStatusChange(key)}
                sx={muiStyles.checkbox}
                size="small"
              />
            }
            label={label}
            sx={muiStyles.label}
          />
        ))}

        {/* Price Range */}
        <h2 className="text-xl font-medium mb-3 mt-8">Price Range</h2>
        <Box sx={{ width: 300 }}>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={muiStyles.slider}
          />
        </Box>
        <h2>
          Range: ${priceRange[0]} - ${priceRange[1]}
        </h2>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-medium mb-3 mt-8">Product Categories</h2>
          {category?.data?.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-1 py-0.5 hover:bg-gray-50 rounded-md"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategory.includes(c?.category)}
                    onChange={() => {
                      setSelectedCategory(
                        selectedCategory.includes(c?.category)
                          ? selectedCategory.filter((s) => s !== c?.category)
                          : [...selectedCategory, c?.category]
                      );
                    }}
                    sx={muiStyles.checkbox}
                    size="small"
                  />
                }
                label={c?.category}
                sx={muiStyles.label}
              />
              <span className="text-gray-400 text-sm">{c?.totalProducts}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="lg:w-[75%] md:w-[60%] w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IoGridOutline
              onClick={!grid && toggleGrid}
              className={`text-3xl p-1.5 rounded-md border cursor-pointer ${
                grid ? "bg-primary text-white" : "text-gray-600"
              }`}
            />
            <AiOutlineMenu
              onClick={grid && toggleGrid}
              className={`text-3xl p-1.5 rounded-md border cursor-pointer ${
                grid ? "text-gray-600" : "bg-primary text-white"
              }`}
            />
          </div>
          <SearchInput setSearchTerm={setSearchTerm} placeholder={"Products"} />
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Products;