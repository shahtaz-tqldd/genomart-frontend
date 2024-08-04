import React, { useEffect, useRef, useState } from "react";
import { navdata } from "../../assets/data/navdata";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiShoppingCartFill } from "react-icons/pi";
import { BiSolidUser } from "react-icons/bi";
import { HiHome, HiMenuAlt1, HiUser } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import MobileMenuDrawer from "./MobileMenuDrawer";
import CartSlide from "../Cart/CartSlide";
import NavDropdown from "./NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { authModalOpen } from "../../feature/auth/authModalSlice";
import Profilemenu from "../../ui/Menu/ProfileMenu";
import { HiMiniArchiveBox } from "react-icons/hi2";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { user } = useSelector((state) => state?.auth);
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClose = () => {
    setOpenMenu(null);
  };

  const handleMenuOpne = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleMenuOptionClick = (e, option) => {
    if (option.item === "My Orders") {
      navigate("/profile/my-orders");
      handleMenuClose();
    }
    if (option.item === "Home") {
      navigate("/");
      handleMenuClose();
    }
    if (option.item === "My Profile") {
      navigate(`/profile/my-info`);
      handleMenuClose();
    }
  };

  const [drawerState, setDrawerState] = useState({ left: false, right: false });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cart = useSelector((state) => state?.cart);

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

    const isChildOfDropdown = dropdownRef?.current?.contains(
      event.relatedTarget
    );

    if (!event.relatedTarget || !isChildOfDropdown) {
      setIsDropdownOpen(false);
    }
  };

  const dispatch = useDispatch();
  const handleOpenAuthModal = () => {
    dispatch(authModalOpen());
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div
      className={`w-full sticky top-0 z-[100]  ${
        isScrolled ? "bg-[#232323]" : isHome ? "bg-transparent" : "bg-[#232323]"
      } text-gray-100`}
    >
      <div className="container flex items-center justify-between py-4">
        <button
          onClick={() => setDrawerState({ left: true })}
          className="md:hidden block"
        >
          <HiMenuAlt1 className="text-lg ml-2" />
        </button>

        <Link
          to={"/"}
          className="text-[2rem] font-bold w-fit font-nav text-gradient"
        >
          <img src={logo} alt="" className="h-8" />
        </Link>

        <div className="flex items-center gap-16 text-white/70 text-poppins text-lg">
          <div className="items-center gap-12 font-medium md:flex hidden">
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
                  Categories
                  <IoIosArrowDown className="mt-0.5" />
                </h1>
                <h1 className="h-5 text-white flex items-center gap-1.5">
                  Categories
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
              id="cart"
              onClick={() => setDrawerState({ right: true })}
              className="bg-white hover:bg-emerald-500 text-black/80 transition rounded-full group overflow-hidden h-8 w-8 grid place-items-center"
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
              {cart?.length || 0}
            </div>
            {user?._id ? (
              <>
                <button
                  onClick={handleMenuOpne}
                  className="bg-white text-black/80 hover:bg-emerald-500 transition rounded-full group overflow-hidden h-8 w-8 grid place-items-center"
                >
                  <div className="group-hover:-translate-y-9 transition duration-700 flex flex-col gap-4 pt-[7px]">
                    {[...Array(2)].map((_, index) => (
                      <BiSolidUser
                        key={index}
                        className="h-5 w-5 group-hover:text-white transform transition-transform"
                      />
                    ))}
                  </div>
                </button>
                <Profilemenu
                  openMenu={openMenu}
                  handleMenuClose={handleMenuClose}
                  options={[
                    { item: "Home", icon: HiHome },
                    { item: "My Profile", icon: HiUser },
                    { item: "My Orders", icon: HiMiniArchiveBox },
                  ]}
                  onClick={handleMenuOptionClick}
                />
              </>
            ) : (
              <button
                onClick={handleOpenAuthModal}
                className="text-white hover:bg-white bg-emerald-500 transition rounded-full group overflow-hidden h-9 px-4 grid place-items-center ml-4"
              >
                <div className="group-hover:-translate-y-9 transition duration-700 flex flex-col gap-4 pt-[8px]">
                  {[...Array(2)].map((_, index) => (
                    <h2
                      key={index}
                      className=" group-hover:text-emerald-500 transform transition-transform text-sm font-medium"
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
          toggleDrawerCart={toggleDrawer}
          setState={setDrawerState}
        />
      </div>
      <div ref={dropdownRef} onMouseLeave={() => setIsDropdownOpen(false)}>
        {isDropdownOpen && (
          <NavDropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
