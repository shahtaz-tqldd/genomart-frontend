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
        fixed top-0 bottom-0`}
      >
        <DSNav toggle={toggle} setToggle={setToggle} />
      </div>
      <div className="w-full md:w-[87%] lg:w-[82%] lg:ml-[18%] md:ml-[13%] ml-0 min-h-screen flex flex-col ">
        <DSTopNav toggle={toggle} setToggle={setToggle} />
        <div className="bg-primary/10 p-5 pl-0 pt-0 flex-1">
          <div className="bg-gray-50 px-3 py-8 rounded-2xl overflow-hidden h-full">
            <div className="container h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
