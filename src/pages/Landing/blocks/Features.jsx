import React from "react";
import { features } from "../../../assets/data/mock/features";

const Features = () => {
  return (
    <div className="container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-x-6 md:gap-y-20 gap-20 mt-40 mb-20">
      {features?.map(({ img, title, text, colors }, i) => (
        <div
          key={i}
          className={`${colors} bg-opacity-60 items-center gap-3 p-4 rounded-xl`}
        >
          <img src={img} alt="" className="h-28 -mt-20 -ml-2 object-contain" />
          <div className="mt-2">
            <h1 className="text-lg font-bold text-slate-800 mb-2">{title}</h1>
            <p className="text-sm text-gray-600">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
