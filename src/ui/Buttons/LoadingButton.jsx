import React from "react";

const LoadingButton = ({ name, loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        loading
          ? "py-3 px-10 rounded-full bg-primary text-white"
          : `py-3 px-10 rounded-full bg-primary text-white hover:bg-black transition duration-200`
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

export default LoadingButton;
