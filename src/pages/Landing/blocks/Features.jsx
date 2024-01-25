import React from "react";
import { features } from "../../../assets/data/mock/features";

const Features = () => {
  return (
    <div className="container grid grid-cols-4 gap-6 mt-40 mb-20">
      {features?.map(({ img, title, text, colors }, i) => (
        <div
          // data-aos="fade-up"
          // data-aos-duration="1000"
          // data-aos-delay={`${150 * (i + 1)}`}
          key={i}
          className={`${colors} bg-opacity-60 items-center gap-3 p-4 rounded-xl`}
        >
          <img src={img} alt="" className="h-28 -mt-24 object-contain" />
          <div className="mt-2">
            <h1 className="text-lg font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-sm text-gray-600">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
