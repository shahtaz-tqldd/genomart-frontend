import React from "react";

const SubmitButton = ({ name, loading, icon: Icon }) => {
  return (
    <button
      type="submit"
      className={
        loading
          ? "py-2 px-7 rounded-full bg-primary text-white"
          : `py-2 px-7 rounded-full bg-primary text-white hover:bg-black transition duration-200`
      }
      disabled={loading}
    >
      <div className="flex gap-2 items-center">
        {loading && (
          <div className="border-gray-400 h-5 w-5 animate-spin rounded-full border-[3px] border-t-gray-600 mx-auto"></div>
        )}
        {name}
      </div>
    </button>
  );
};

export default SubmitButton;
