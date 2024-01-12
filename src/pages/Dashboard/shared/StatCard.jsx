import React from "react";

const StatCard = ({ color, num, title, img }) => {
  return (
    <div className={`px-6 py-8 rounded-xl flex justify-between items-center bg-opacity-30 ${color}`}>
      <div>
        <h2 className="uppercase text-sm">{title}</h2>
        <h2 className="text-5xl font-extrabold text-slate-700 mt-3">{num}</h2>
      </div>
      <img src={img} className="h-20" alt="" />
    </div>
  );
};

export default StatCard;
