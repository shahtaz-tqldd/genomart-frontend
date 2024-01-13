import React from "react";
import notfound from "../assets/images/noitem.png";

const NotFound = ({ text }) => {
  return (
    <div className="flex flex-col items-center mt-8">
      <img src={notfound} alt="" className="h-32 w-32 object-contain" />
      <h2 className="text-center mt-2 font-semibold text-2xl text-gray-500">{text}</h2>
    </div>
  );
};

export default NotFound;
