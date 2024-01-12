import React from "react";
import Greetings from "../../../utiles/Greetings";
import { Link } from "react-router-dom";
import AddButton from "../../../ui/Buttons/AddButton";

const BannerList = () => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <Greetings page={"Banner List"} />
        <Link to={"/dashboard/banner/create-banner"}>
          <AddButton name={"Create Banner"} />
        </Link>
      </div>
    </div>
  );
};

export default BannerList;
