import React from "react";
import Heading from "../../ui/Heading/Heading";
import { useGetMyWishListQuery } from "../../feature/products/productsApiSlice";
import { useSelector } from "react-redux";
import WishListProductCard from "../../components/ProductCards/WishListProductCard";
import useTitle from "../../hooks/useTitle";

const Wishlistpage = () => {
  useTitle("My Wishlist");
  const { token } = useSelector((state) => state?.auth);
  const {
    data: wishlist,
    isLoading,
    isSuccess,
  } = useGetMyWishListQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );

  let content;

  if (isLoading && !isSuccess) {
    content = <h1>Loading...</h1>;
  }

  if (!isLoading && isSuccess) {
    content = wishlist?.data?.map((data, i) => (
      <WishListProductCard key={i} data={data} />
    ));
  }
  return (
    <div>
      <Heading title={"My Wishlist"} />
      <div className="grid grid-cols-2 gap-8 mt-10">{content}</div>
      {wishlist?.data <= 0 && (
        <h2 className="text-2xl text-gray-400">
          You have no items in wishlist!
        </h2>
      )}
    </div>
  );
};

export default Wishlistpage;
