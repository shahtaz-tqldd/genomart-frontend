import React from "react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { defaultShopData } from "../../assets/data/defaultData";
import { authModalOpen } from "../../feature/auth/authModalSlice";
import { useDispatch } from "react-redux";
import SocialMedia from "../../utiles/SocialMedia";
import { useGetSettingsInfoQuery } from "../../feature/dashboard/dashboardApiSlice";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const { data } = useGetSettingsInfoQuery({}, { refetchOnReconnect: true });
  const dispatch = useDispatch();
  const navItems = [
    { name: "Products", path: "/products" },
    { name: "Store Location", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];
  const navItems2 = [
    { name: "Terms and Conditions", path: "/terms-and-conditions" },
    { name: "Refund Policy", path: "/policy" },
  ];
  return (
    <div className="bg-black/90 text-white">
      <footer className="container px-6 mt-16">
        <section className="grid lg:grid-cols-4 grid-cols-2 mb-4 pt-12">
          <div>
            <Link to={"/"} className="flex items-center gap-3">
              <img src={logo} alt="" className="h-10" />
              <span className="text-xl uppercase tracking-[2px]">
                geno<span className="font-semibold">mart</span>
              </span>
            </Link>
            <span className="mt-2 ml-[52px] text-white/50">Ecommerce store</span>
          </div>
          <div>
            <h2 className="mb-2 font-medium uppercase">Menubar</h2>
            <ul className="flex flex-col text-sm text-white/75">
              {navItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link to={item.path} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="mb-2">
                <button
                  onClick={() => dispatch(authModalOpen())}
                  className="hover:underline"
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-medium uppercase">Useful Links</h2>
            <ul className="flex flex-col gap-[6px] text-sm">
              {navItems2.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="hover:underline text-white/75">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-medium uppercase">Reach Out to us</h2>
            <div className="flex items-center gap-2 mb-[5px] text-sm text-white/75">
              <HiOutlineMail /> {data?.data?.email || defaultShopData?.email}
            </div>
            <div className="flex items-center gap-2 mb-[5px] text-sm text-white/75">
              <HiOutlinePhone />{" "}
              {data?.data?.contact || defaultShopData?.contact}{" "}
            </div>
          </div>
        </section>
        <hr className="border-1 border-white/20" />
        <section className="py-5 flex justify-between">
          <div className="lg:text-md md:text-sm text-xs text-white/60">
            All rights reserved to {data?.data?.name || defaultShopData?.name}{" "}
            &copy; {new Date().getFullYear()}
          </div>
          <SocialMedia />
        </section>
      </footer>
    </div>
  );
};

export default Footer;
