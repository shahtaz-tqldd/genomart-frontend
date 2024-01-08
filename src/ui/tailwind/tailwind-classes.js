import classNames from "classnames";

export const dashboardMenu = classNames(
  "w-full px-4 py-1.5 flex items-center gap-2 text-md font-normal transition-all duration-300"
);

// buttons
export const primarybtn = classNames(
  "py-2 pl-4 pr-5 rounded bg-primaryColor text-white flex items-center gap-2"
);
export const dotbtn = classNames(
  "-mr-4 h-8 w-8 p-2 hover:bg-slate-100 rounded-full rotate-90 cursor-pointer"
);

export const btn = classNames(
  "bg-primaryColor hover:bg-transparent hover:text-primaryColor border-primaryColor border lg:py-2 py-1 lg:px-6 px-3 rounded-md text-base text-white transition duration-300"
);
export const btnsm = classNames(
  "bg-primaryColor hover:bg-transparent hover:text-primaryColor border-primaryColor border py-1 pl-2 pr-3 rounded-md text-sm text-white transition duration-300"
);

export const btnOutline = classNames(
  "bg-transparent hover:bg-primaryColor hover:text-white border-primaryColor border text-primaryColor py-2 px-6 rounded-md text-base transition duration-300"
);

export const dropdownbtn = classNames(
  "py-2 px-4 hover:bg-slate-200 rounded-lg hover:text-slate-800 flex gap-2 items-center justify-between font-semibold transition duration-300 select-none"
);

export const dropdownbtnRegular = classNames(
  "py-1.5 px-3 border border-1 border-gray-300 text-xs rounded-full shadow-md hover:bg-green-100 hover:text-green-800 flex gap-2 items-center transition duration-300 select-none"
);
export const dropdownbtnLg = classNames(
  "bg-white py-2 px-5 border border-1 border-gray-300 text-md rounded-lg shadow-md hover:bg-green-100 hover:text-green-800 flex gap-2 items-center transition duration-300 select-none"
);
export const dropdownbtnMd = classNames(
  "bg-transparent py-1 w-full border-b border-gray-400 hover:border-gray-800 text-gray-800 flex justify-between items-center select-none"
);

// scrollbar

export const scrollbar = classNames(
  "overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
);
