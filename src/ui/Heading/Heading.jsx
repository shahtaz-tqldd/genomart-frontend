import React from "react";

const Heading = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="border border-gray-400 w-20 mb-8 mt-2"></div>
    </div>
  );
};

export default Heading;
