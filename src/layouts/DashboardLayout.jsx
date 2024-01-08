import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../assets/styles/dashboard-sidebar.css";
import DSNav from "../components/Navbar/DSNav";
import DSTopNav from "../components/Navbar/DSTopNav";

const DashboardLayout = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <section className="flex">
      <div
        className={`${toggle ? "left-0" : "left-[-100%]"} 
        transition-all duration-500 md:left-0 w-[60%] md:w-[13%] lg:w-[18%] z-[100]
        fixed top-0 bottom-0 overflow-y-auto scroll-smooth 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white 
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}
      >
        <DSNav toggle={toggle} setToggle={setToggle} />
      </div>
      <div className="w-full md:w-[87%] lg:w-[82%] lg:ml-[18%] md:ml-[13%] ml-0 h-full">
        <DSTopNav toggle={toggle} setToggle={setToggle} />
        <div className="lg:p-8 md:p-4 p-2 w-[100vw] md:w-full overflow-hidden md:overflow-auto">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
