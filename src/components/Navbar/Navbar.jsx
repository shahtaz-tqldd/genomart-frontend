import React, { useRef, useState } from "react";
import { navdata } from "../../assets/data/navdata";
import { Link } from "react-router-dom";
import { PiShoppingCartFill } from "react-icons/pi";
import { BiSolidUser } from "react-icons/bi";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import MobileMenuDrawer from "./MobileMenuDrawer";
import CartSlide from "../Cart/CartSlide";
import NavDropdown from "./NavDropdown";

const Navbar = () => {
  const user = [];
  const [drawerState, setDrawerState] = useState({ left: false, right: false });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = (event) => {
    if (!dropdownRef.current) {
      return;
    }

    const isChildOfDropdown = dropdownRef.current.contains(event.relatedTarget);

    if (!event.relatedTarget || !isChildOfDropdown) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="bg-[#8ADAB2]">
      <div className="cont flex items-center justify-between py-3 text-[#31304D]">
        <button
          onClick={() => setDrawerState({ left: true })}
          className="md:hidden block"
        >
          <HiMenuAlt1 className="text-lg ml-2" />
        </button>

        <Link
          to={"/"}
          className="text-3xl font-nav hover:text-black transition"
        >
          geno mart
        </Link>

        <div className="flex items-center gap-12">
          <div className="items-center gap-8 font-medium md:flex hidden">
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group h-5 overflow-hidden mt-1"
            >
              <div
                className={`group-hover:-translate-y-5 ${
                  isDropdownOpen ? "-translate-y-5" : ""
                } transition duration-500 -mt-0.5`}
              >
                <h1 className="h-5 flex items-center gap-1.5">
                  {/* <d.icon /> */}
                  Products
                  <IoIosArrowDown className="mt-0.5" />
                </h1>
                <h1 className="h-5 text-white flex items-center gap-1.5">
                  {/* <d.icon /> */}
                  Products
                  <IoIosArrowDown
                    className={`mt-0.5 ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    } tr`}
                  />
                </h1>
              </div>
            </button>

            {navdata?.map((d, i) => (
              <Link
                key={i}
                to={d.link}
                className="group h-5 overflow-hidden mt-1"
              >
                <div className="group-hover:-translate-y-5 transition duration-500 -mt-0.5">
                  <h1 className="h-5 flex items-center gap-1.5">{d.title}</h1>
                  <h1 className="h-5 text-white flex items-center gap-1.5">
                    {d.title}
                  </h1>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 relative mr-2">
            <button
              onClick={() => setDrawerState({ right: true })}
              className="bg-white hover:bg-gray-700 transition rounded-full group overflow-hidden h-8 w-8 grid place-items-center"
            >
              <div className="group-hover:-translate-y-9 transition duration-700 flex flex-col gap-4 pt-[7px]">
                {[...Array(2)].map((_, index) => (
                  <PiShoppingCartFill
                    key={index}
                    className="h-5 w-5 group-hover:text-white transform transition-transform"
                  />
                ))}
              </div>
            </button>

            <div className="absolute -top-2 left-5 z-10 bg-red-500 text-white text-xs font-bold h-5 w-5 rounded-full grid place-items-center">
              4
            </div>
            {user?.length > 0 ? (
              <button className="bg-white hover:bg-gray-700 transition rounded-full group overflow-hidden h-8 w-8 grid place-items-center">
                <div className="group-hover:-translate-y-9 transition duration-700 flex flex-col gap-4 pt-[7px]">
                  {[...Array(2)].map((_, index) => (
                    <BiSolidUser
                      key={index}
                      className="h-5 w-5 group-hover:text-white transform transition-transform"
                    />
                  ))}
                </div>
              </button>
            ) : (
              <button className="bg-white hover:bg-gray-700 transition rounded-full group overflow-hidden h-9 px-4 grid place-items-center ml-4">
                <div className="group-hover:-translate-y-9 transition duration-700 flex flex-col gap-4 pt-[8px]">
                  {[...Array(2)].map((_, index) => (
                    <h2
                      key={index}
                      className=" group-hover:text-white transform transition-transform text-sm font-medium"
                    >
                      Get Started
                    </h2>
                  ))}
                </div>
              </button>
            )}
          </div>
        </div>

        <MobileMenuDrawer
          state={drawerState}
          setState={setDrawerState}
          toggleDrawer={toggleDrawer}
          data={navdata}
        />
        <CartSlide
          state={drawerState}
          setState={setDrawerState}
          toggleDrawerCart={toggleDrawer}
        />
      </div>
      <div ref={dropdownRef} onMouseLeave={() => setIsDropdownOpen(false)}>
        {isDropdownOpen && <NavDropdown isOpen={isDropdownOpen} />}
      </div>
    </div>
  );
};

export default Navbar;
