import React from "react";
import UserTable from "./UserTable";
import Greetings from "../../../utiles/Greetings";
import useTitle from "../../../hooks/useTitle";

const UserList = () => {
  useTitle("User List")
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
