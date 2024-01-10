import React from "react";
import OrderTable from "./OrderTable";
import Greetings from "../../../utiles/Greetings";

const OrderList = () => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <Greetings page={"Order List"} />
      </div>
      <OrderTable />
    </div>
  );
};

export default OrderList;
