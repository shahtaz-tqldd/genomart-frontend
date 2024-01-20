import React from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const Profile = () => {
  const { pathname } = useLocation();

  const isCurrentTab = (tab) => pathname.includes(tab);

  return (
    <div className="container mt-8">
      <div className="w-[260px] flex flex-col gap-2 fixed mt-4 top-20">
        {[
          { to: `/profile/my-info`, label: "My Information" },
          { to: `/profile/my-orders`, label: "My Orders" },
          { to: `/profile/wishlist`, label: "My Wishlist" },
          { to: `/profile/response`, label: "Response" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`py-2 px-5 ${
              isCurrentTab(item.to) ? "bg-primaryColor text-white":"hover:bg-green-100 hover:text-primaryColor tr"
            }  rounded-lg w-full text-start`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="ml-[320px] w-4/5 min-h-[60vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
