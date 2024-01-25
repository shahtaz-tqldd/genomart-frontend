import React from "react";
import Ratings from "../../utiles/Ratings";
import moment from "moment";

const ReviewCard = ({ data }) => {
  const { comment, name, rating, img, createdAt } = data;
  return (
    <div className="border flex flex-col justify-between border-slate-400 rounded-xl p-4">
      <p className="text-sm text-slate-700">{comment}</p>
      <div>
        <hr className="mb-2 mt-4" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {img ? (
              <img
                className="w-10 h-10 object-cover rounded-full border-[3px] border-blue-200 hover:border-blue-300 transition duration-300"
                src={img}
                alt={name}
              />
            ) : (
              <div className="h-9 w-9 rounded-full grid place-items-center font-bold text-white bg-orange-500 text-xl">
                {name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-sm font-semibold text-gray-700">{name}</h2>
              <p className="text-xs text-gray-500">
                {moment(createdAt).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
          <Ratings rating={rating} />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
