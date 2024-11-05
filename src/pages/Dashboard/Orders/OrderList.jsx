import React, { useState } from "react";
import OrderTable from "./OrderTable";
import Greetings from "../../../utiles/Greetings";
import SearchInput from "../../../ui/InputField/SearchInput";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import useTitle from "../../../hooks/useTitle";
import Heading from "../../../ui/Heading/Heading";

const OrderList = () => {
  useTitle("Order List");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleCheckboxChange = (status) => {
    const isStatusSelected = selectedStatus.includes(status);
    if (isStatusSelected) {
      setSelectedStatus((prevStatus) => prevStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus((prevStatus) => [...prevStatus, status]);
    }
  };

  const checkboxStyle = {
    fontSize: "8px",
    color: "#10b981",
    marginLeft:"6px"
  };

  return (
    <div>
      <div className="flex justify-between items-start">
        <Heading title={"Order List"}/>
      </div>
      <div className="flex justify-between items-center px-2 -ml-6">
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox style={checkboxStyle} />}
            label="Pending"
            style={checkboxStyle}
            onChange={() => handleCheckboxChange("pending")}
          />
          <FormControlLabel
            control={<Checkbox style={checkboxStyle} />}
            label="Processing"
            style={checkboxStyle}
            onChange={() => handleCheckboxChange("processing")}
          />
          <FormControlLabel
            control={<Checkbox style={checkboxStyle} />}
            label="Completed"
            style={checkboxStyle}
            onChange={() => handleCheckboxChange("completed")}
          />
          <FormControlLabel
            control={<Checkbox style={checkboxStyle} />}
            label="Cancel"
            style={checkboxStyle}
            onChange={() => handleCheckboxChange("cancel")}
          />
        </FormGroup>
        <SearchInput setSearchTerm={setSearchTerm} placeholder={"Orders"} />
      </div>
      <OrderTable searchTerm={searchTerm} selectedStatus={selectedStatus} />
    </div>
  );
};

export default OrderList;
