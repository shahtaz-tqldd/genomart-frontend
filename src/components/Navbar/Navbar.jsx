import React, { useState } from "react";
import { navdata } from "../../assets/data/navdata";
import { Link } from "react-router-dom";
import { PiShoppingCartFill } from "react-icons/pi";
import { BiSolidUser } from "react-icons/bi";
import { HiMenuAlt1 } from "react-icons/hi";
import MobileMenuDrawer from "./MobileMenuDrawer";

const Navbar = () => {
  const [state, setState] = useState({ left: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  return (
    <div className="bg-[#8ADAB2]">
      <div className="cont fleb py-3 text-[#31304D]">
        <button
          onClick={() => setState({ left: true })}
          className="md:hidden block"
        >
          <HiMenuAlt1 className="text-lg" />
          <MobileMenuDrawer
            state={state}
            setState={setState}
            toggleDrawer={toggleDrawer}
            data={navdata}
          />
        </button>

        <Link to={"/"} className="text-3xl font-nav hover:text-black tr">
          geno mart
        </Link>
        <div className="fl gap-16">
          <div className="items-center gap-8 font-medium md:flex hidden">
            {navdata?.map((d, i) => (
              <Link
                key={i}
                to={d.link}
                className="h-5 group overflow-hidden mt-1"
              >
                <div className="group-hover:-translate-y-5 transition duration-500 -mt-0.5">
                  <h1 className="h-5 fl gap-1.5">
                    <d.icon />
                    {d.title}
                  </h1>
                  <h1 className="h-5 text-white fl gap-1.5">
                    <d.icon />
                    {d.title}
                  </h1>
                </div>
              </Link>
            ))}
          </div>

          <div className="fl gap-3">
            <button className="bg-white hover:bg-gray-700 tr h-8 w-8 grid place-items-center rounded-full group">
              <PiShoppingCartFill className=" h-4 w-4 group-hover:text-white tr" />
            </button>
            <button className="bg-white hover:bg-gray-700 tr h-8 w-8 grid place-items-center rounded-full group">
              <BiSolidUser className=" h-4 w-4 group-hover:text-white tr" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
