import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
// import logo from "../../assets/images/logo/logo_with_text.png";
import { userLoggedOut } from "../../feature/auth/authSlice";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { dashboardMenu } from "../../ui/tailwind/tailwind-classes";
import { dsnavdata } from "../../assets/data/dsnavdata";

const DSNav = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const role = user?.role;
  const location = useLocation();

  const isActiveNavLink = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  return (
    <div className="min-h-screen relative bg-white border-r border-gray-300">
      <div
        onClick={() => setToggle(!toggle)}
        className="h-7 w-7 bg-slate-200 hover:bg-slate-300 text-slate-700 hover:slate-800 rounded-full lg:hidden grid place-items-center absolute top-5 right-4 cursor-pointer"
      >
        <BiChevronLeft className="text-2xl" />
      </div>
      <div className="py-4 flex flex-col items-center justify-center gap-2">
        <Link
          to={"/dashboard"}
          className="text-3xl font-nav hover:text-black transition"
        >
          geno mart
        </Link>
        <h2 className="uppercase tracking-widest text-sm">Admin Dashboard</h2>
      </div>

      <div className="mt-2 mx-4">
        {dsnavdata?.map(({ stackName, data }, index) => (
          <div className="my-5" key={index}>
            <h2 className="text-gray-400 mb-2 uppercase font-bold text-xs ml-2">
              {stackName}
            </h2>
            {data?.map((item, index) => (
              <div key={index} className="group">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className={`
                      ${dashboardMenu} ${
                        location.pathname
                          .split("/")[1]
                          .includes(item.title.toLocaleLowerCase())
                          ? "text-primaryColor bg-emerald-100"
                          : "text-gray-600"
                      } group-hover:bg-slate-100 rounded-md`}
                    >
                      <item.icon className="text-base" />
                      {item.title}
                      <BiChevronRight
                        className={`${
                          openDropdown === item.title && "rotate-90"
                        } text-lg transition-all duration-500 ml-auto`}
                      />
                    </button>
                    <div
                      className={`${
                        openDropdown === item.title
                          ? "max-h-40 mt-1 overflow-y-hidden transition-all duration-500"
                          : "max-h-0 mt-1 overflow-hidden transition-all duration-500"
                      }`}
                    >
                      {item.children.map((childItem, childIndex) => (
                        <NavLink
                          key={childIndex}
                          to={childItem.link}
                          onClick={() => setToggle(false)}
                          className={`${
                            isActiveNavLink(childItem.link)
                              ? "text-primaryColor"
                              : "text-gray-500"
                          } hover:bg-emerald-50 items-center gap-2 py-1.5 text-sm pl-7 rounded-md ${
                            childItem?.roles
                              ? childItem?.roles?.includes(role)
                                ? "flex"
                                : "hidden"
                              : "flex"
                          }`}
                        >
                          <childItem.icon className="text-sm" />
                          {childItem.title}
                        </NavLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    title={item.title}
                    to={item.link}
                    onClick={() => setToggle(false)}
                    className={`${
                      isActiveNavLink(item.link) ? "bg-emerald-100" : ""
                    } ${dashboardMenu} ${
                      isActiveNavLink(item.link)
                        ? "text-primaryColor"
                        : "text-gray-500"
                    }  group-hover:bg-slate-100 rounded-md`}
                  >
                    <item.icon className="text-base" />
                    {item.title}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="group pb-8">
          <button
            onClick={handleLogout}
            className={`py-2 w-full bg-red-500 hover:bg-red-600 text-white rounded-md flex justify-center transition duration-300`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DSNav;
