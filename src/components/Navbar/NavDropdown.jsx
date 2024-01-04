import React from "react";

const NavDropdown = ({ isOpen }) => {
  return (
    <div className="w-4/5 h-[20rem] left-1/2 -translate-x-1/2 absolute -mt-5 rounded-xl z-[20]">
      <div className="w-full h-5 bg-transparent"></div>
      <div
        className="w-full h-full shadow border p-6 bg-red-200 rounded-xl"
        style={{
          opacity: isOpen ? "1" : "0",
          transition: "opacity 0.5s",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        NavDropdown
      </div>
    </div>
  );
};

export default NavDropdown;
