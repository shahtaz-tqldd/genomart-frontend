import React from "react";
import Heading from "../../ui/Heading/Heading";
import useTitle from "../../hooks/useTitle";

const ResponsePage = () => {
  useTitle("Response")
  return (
    <div>
      <Heading title={"Response"} />
      <h2 className="text-2xl mt-10 text-gray-400">You have currently no response!</h2>
    </div>
  );
};

export default ResponsePage;
