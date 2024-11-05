import React from "react";
import UserTable from "./UserTable";
import useTitle from "../../../hooks/useTitle";
import Heading from "../../../ui/Heading/Heading";

const UserList = () => {
  useTitle("User List");
  return (
    <div>
      <div className="flex justify-between items-start">
        <Heading title={"User List"} />
      </div>
      <UserTable />
    </div>
  );
};

export default UserList;
