import React from "react";

const SubmitButton = ({ name, loading }) => {
  return (
    <button
      type="submit"
      className={
        loading
          ? "py-2 px-7 border-2 border-gray-200 rounded-lg bg-primaryColor text-white"
          : `py-2 px-7 border-2 border-primaryColor rounded-lg bg-primaryColor text-white hover:bg-[#1d8f86] hover:border-[#1d8f86] transition duration-200`
      }
      disabled={loading}
    >
      <div className="flex gap-2 items-center">
        {name}
        {loading && (
          <div className="border-gray-400 h-5 w-5 animate-spin rounded-full border-[3px] border-t-gray-600 mx-auto"></div>
        )}
      </div>
    </button>
  );
};

export default SubmitButton;
