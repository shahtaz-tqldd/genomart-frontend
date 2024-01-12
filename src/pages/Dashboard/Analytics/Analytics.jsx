import React, { useState } from "react";
import Greetings from "../../../utiles/Greetings";
import { Box, Tab, Tabs } from "@mui/material";

const Analytics = () => {
  const [value, setValue] = useState("product");
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <div>
      <Greetings page={"Analytics"} />
      <Box sx={{ width: "100%", marginTop:2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab className="normal-case font-bold" value="product" label="Products" />
          <Tab className="normal-case font-bold" value="order" label="Orders" />
          <Tab className="normal-case font-bold" value="user" label="Users" />
        </Tabs>
      </Box>
    </div>
  );
};

export default Analytics;
