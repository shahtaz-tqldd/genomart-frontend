import React from "react";
import { FiPlus } from "react-icons/fi";

const AddButton = ({ name }) => {
  return (
    <div>
      <button
        className={
          "py-2 pl-3 pr-5 bg-primaryColor hover:bg-secondary tr rounded-lg text-white flex items-center gap-2"
        }
      >
        <FiPlus /> <span>{name}</span>
      </button>
    </div>
  );
};

export default AddButton;
