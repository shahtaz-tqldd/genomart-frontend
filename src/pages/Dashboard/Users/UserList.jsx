import React from "react";
import UserTable from "./UserTable";
import AddButton from "../../../ui/Buttons/AddButton";
import Greetings from "../../../utiles/Greetings";
import { Link } from "react-router-dom";

const UserList = () => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <Greetings page={"User List"} />
      </div>
      <UserTable />
    </div>
  );
};

export default UserList;
