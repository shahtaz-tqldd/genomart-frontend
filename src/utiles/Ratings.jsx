import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Ratings = ({ rating, size = 14, mt }) => {
  const hasHalfStar = rating % 1 !== 0; // Check if the decimal part is not 0

  const renderStars = () => {
    const starsArray = Array.from({ length: 5 }, (_, index) => {
      if (index + 1 <= rating) {
        return <FaStar key={index} className="text-orange-600" />;
      } else if (hasHalfStar && index + 0.5 === rating) {
        return <FaStarHalfAlt key={index} className="text-orange-600" />;
      } else {
        return <FaRegStar key={index} className="text-orange-600" />;
      }
    });

    return starsArray;
  };

  return (
    <div
      style={{ fontSize: `${size}px`, marginTop: `${mt}px` }}
      className="flex gap-1.5"
    >
      {renderStars()}
    </div>
  );
};

export default Ratings;
