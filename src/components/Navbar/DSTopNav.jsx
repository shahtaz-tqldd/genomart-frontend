import { useState } from "react";
import { HiMenuAlt1, HiUser } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
import { RiMessage3Fill } from "react-icons/ri";
import { HiHome } from "react-icons/hi";
import Profilemenu from "../../ui/Menu/ProfileMenu";

const DSTopNav = ({ toggle, setToggle }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const { user } = useSelector((state) => state?.auth);
  const handleMenuClose = () => {
    setOpenMenu(null);
  };

  const handleMenuOpne = (event) => {
    setOpenMenu(event.currentTarget);
  };

  return (
    <div
      className="bg-white flex justify-between items-center shadow py-3 px-6 sticky top-0"
      style={{ zIndex: 99 }}
    >
      <div className="w-full flex justify-between items-center gap-4">
        <div className="transition-all duration-300 cursor-pointer rounded-full flex items-center gap-4">
          <div
            onClick={() => setToggle(!toggle)}
            className="lg:hidden md:hidden block"
          >
            <HiMenuAlt1 />
          </div>
          <div className="lg:w-[360px] w-64 lg:flex mr-8 md:flex hidden items-center relative">
            <input
              type="text"
              className="w-full outline-none border border-gray-300 rounded-lg pr-3 pl-[34px] py-2"
              placeholder="Search"
            />

            <FiSearch className="text-gray-500 absolute top-1/2 -translate-y-1/2 left-3" />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 hover:bg-slate-100 grid place-items-center rounded-full cursor-pointer">
            <RiMessage3Fill className="text-gray-500 h-6 w-6" />
          </div>
          <div className="relative h-10 w-10 hover:bg-slate-100 grid place-items-center rounded-full cursor-pointer">
            <IoMdNotifications className="text-gray-500 h-6 w-6" />
            <span className="w-5 h-5 flex justify-center items-center text-white absolute bottom-[50%] left-[50%] text-[9px] rounded-full bg-red-500 border border-white">
              6
            </span>
          </div>
          <div
            onClick={handleMenuOpne}
            className="rounded-md flex items-center justify-between gap-2 px-4 lg:mr-0 md:mr-0 -mr-8 py-1 relative cursor-pointer"
          >
            {user?.photo?.url ? (
              <img
                className="w-10 h-10 object-cover rounded-full border-[3px] border-blue-200 hover:border-blue-300 transition duration-300"
                src={user?.photo?.url}
                alt={user?.fullname}
              />
            ) : (
              <div className="h-9 w-9 rounded-full grid place-items-center font-bold text-white bg-orange-500 text-xl">
                {user?.fullname?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <Profilemenu
            openMenu={openMenu}
            handleMenuClose={handleMenuClose}
            options={[
              { item: "Home", icon: HiHome },
              { item: "Profile", icon: HiUser },
              { item: "Settings", icon: IoMdSettings },
            ]}
            // onClick={handleMenuOptionClick}
          />
        </div>
      </div>
    </div>
  );
};

export default DSTopNav;
