import React from "react";
import Heading from "../../../ui/Heading/Heading";
import MyOrderTable from "./MyOrderTable";
import useTitle from "../../../hooks/useTitle";

const MyOrder = () => {
  useTitle("My Orders")
  return (
    <div>
      <Heading title={"My Orders"} />
      <MyOrderTable />
    </div>
  );
};

export default MyOrder;
