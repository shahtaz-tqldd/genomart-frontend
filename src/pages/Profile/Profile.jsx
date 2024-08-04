import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiHeart, FiMessageSquare, FiShoppingCart, FiUser } from "react-icons/fi";

const Profile = () => {
  const { pathname } = useLocation();
  const isCurrentTab = (tab) => pathname.includes(tab);

  return (
    <div className="container mt-8">
      <div className="lg:w-[260px] md:w-[200px] md:flex hidden flex-col gap-2 fixed mt-4 top-20">
        {[
          { to: `/profile/my-info`, label: "My Information", icon: <FiUser/> },
          { to: `/profile/my-orders`, label: "My Orders", icon:<FiShoppingCart/> },
          { to: `/profile/wishlist`, label: "My Wishlist", icon:<FiHeart/> },
          { to: `/profile/response`, label: "Response", icon:<FiMessageSquare/> },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`py-2 px-5 ${
              isCurrentTab(item.to)
                ? "bg-primary text-white"
                : "hover:bg-green-100 hover:text-primary tr"
            }  rounded-lg w-full text-start flex items-center gap-2`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
      <div className="lg:ml-[320px] md:ml-[260px] lg:w-4/5 md:w-3/5 w-full min-h-[60vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
