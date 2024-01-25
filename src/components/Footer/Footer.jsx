import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Link } from "react-router-dom";
import { defaultShopData } from "../../assets/data/defaultData";
import { authModalOpen } from "../../feature/auth/authModalSlice";
import { useDispatch } from "react-redux";
import SocialMedia from "../../utiles/SocialMedia";
import { useGetSettingsInfoQuery } from "../../feature/dashboard/dashboardApiSlice";

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
    <div className="bg-[#8ADAB2] bg-opacity-40">
      <footer className="container px-6 mt-16">
        <section className="grid lg:grid-cols-4 grid-cols-2 mb-4 pt-12">
          <div>
            <Link
              to={"/"}
              className="text-3xl font-nav hover:text-black transition lowercase"
            >
              {data?.data?.name || defaultShopData?.name}
            </Link>
            <h2 className="uppercase mt-3 text-xs lg:tracking-[4px] tracking-[1px]">
              {data?.data?.bio || defaultShopData?.bio}
            </h2>
          </div>
          <div>
            <h2 className="mb-2 font-bold">Menubar</h2>
            <ul className="flex flex-col text-xs">
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
            <h2 className="mb-2 font-bold">Useful Links</h2>
            <ul className="flex flex-col gap-[6px] text-xs">
              {navItems2.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <h2 className="mb-2 font-bold">Reach Out to us</h2>
            <span className="flex items-center gap-2 mb-[5px]">
              <HiOutlineMail /> {data?.data?.email || defaultShopData?.email}
            </span>
            <span className="flex items-center gap-2 mb-[5px]">
              <HiOutlinePhone />{" "}
              {data?.data?.contact || defaultShopData?.contact}{" "}
            </span>
          </div>
        </section>
        <hr className="border-1 border-gray-400" />
        <section className="py-5 flex justify-between">
          <div className="lg:text-md md:text-sm text-xs">
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
