import React from "react";
import Heading from "../../ui/Heading/Heading";
import ReviewCard from "./ReviewCard";
import { reviews } from "../../assets/data/mock/reviews";


const ShopReviews = () => {
  return (
    <div>
      <Heading title="Customer Reviews" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-5">
        {reviews?.map((data, i) => (
          <ReviewCard key={i} data={data} />
        ))}
      </div>
    </div>
  );
};

export default ShopReviews;
