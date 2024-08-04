import React from "react";
import { features } from "../../../assets/data/mock/features";
import Lordicon from "../../../utiles/Lordicon";

const Features = () => {
  return (
    <div className="container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-x-6 md:gap-y-20 gap-6 mt-20">
      {features?.map(({ icon, title, text, colors }, i) => (
        <div key={i} className={`items-center gap-3 p-4 rounded-xl`}>
          <Lordicon link={icon} size={50} color={"#222"} target={"div"} />
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
