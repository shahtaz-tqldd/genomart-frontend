import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = ({ setSearchTerm, placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={`Search ${placeholder}`}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="py-1 pl-6 focus:outline-none border-b border-b-gray-300 focus:border-gray-600 w-[300px]"
      />
      <IoSearch className="absolute left-0 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchInput;
