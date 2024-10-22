import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../feature/products/productsApiSlice";
import CategorySkeleton from "../../../components/Skeletons/CategorySkeleton";
import { bgcolors } from "../../../assets/data/colors";

const HomeCategories = () => {
  const navigate = useNavigate();

  const {
    data: category,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllCategoriesQuery({
    refetchOnReconnect: true,
  });

  const handleNavigateProduct = (name) => {
    navigate("/products", { state: { category: name } });
  };

  const getNumberOfColumns = () => {
    if (window.innerWidth >= 1024) {
      return 5;
    } else if (window.innerWidth >= 768) {
      return 3;
    } else {
      return 2;
    }
  };

  let content;

  if ((isLoading && !isSuccess) || isError) {
    content = Array(getNumberOfColumns())
      .fill(null)
      .map((_, i) => <CategorySkeleton key={i} />);
  } else if (!isLoading && isSuccess && !isError) {
    content = category?.data?.map(({ image, category, totalProducts }, i) => (
      <div
        key={i}
        onClick={() => handleNavigateProduct(category)}
        className={`fl gap-3 group cursor-pointer py-4 px-2 rounded-lg ${
          bgcolors[i % bgcolors.length]
        } bg-opacity-5 hover:bg-opacity-10 tr border border-black/5`}
      >
        <img src={image} alt="" className="h-14 w-14 object-contain" />
        <div>
          <h1 className="text-md font-semibold leading-[18px] text-black group-hover:text-primary tr">
            {category}
          </h1>
          <p className="text-sm text-red-500">{totalProducts} products</p>
        </div>
      </div>
    ));
  }

  return (
    <div className="my-20 container relative grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
      {content}
    </div>
  );
};

export default HomeCategories;
