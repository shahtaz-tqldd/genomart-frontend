import { AiOutlineBarChart, AiOutlineProfile } from "react-icons/ai";
import { FiEdit, FiSettings, FiUsers } from "react-icons/fi";

import { BsViewList } from "react-icons/bs";

import { IoCartOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import { RiCustomerServiceLine } from "react-icons/ri";
import { TbBrandJuejin } from "react-icons/tb";

export const dsnavdata = [
  {
    stackName: "Overview",
    data: [
      {
        title: "Dashboard",
        link: "/dashboard",
        icon: RxDashboard,
      },
      {
        title: "Analytics",
        link: "/analytics",
        icon: AiOutlineBarChart,
      },
    ],
  },
  {
    stackName: "Management",
    data: [
      {
        title: "Users",
        link: "/dashboard/users",
        icon: FiUsers,
      },
      {
        title: "Orders",
        link: "/dashboard/orders",
        icon: IoCartOutline,
      },

      {
        title: "Products",
        link: "/dashboard/products",
        icon: AiOutlineProfile,
      },

      {
        title: "Featured Products",
        link: "/banners",
        icon: TbBrandJuejin,
        children: [
          {
            title: "Banner Products",
            link: "/banner",
            icon: BsViewList,
          },
          {
            title: "Special Offer",
            link: "/banners/create-banner",
            icon: FiEdit,
          },
          {
            title: "Top Sold",
            link: "/banners/create-banner",
            icon: FiEdit,
          },
          {
            title: "Pick Of the day",
            link: "/banners/create-banner",
            icon: FiEdit,
          },
        ],
      },
    ],
  },

  {
    stackName: "Support",
    data: [
      {
        title: "Customer Support",
        link: "/customer-support",
        icon: RiCustomerServiceLine,
      },
      {
        title: "FAQ",
        link: "/faq",
        icon: GoQuestion,
      },
      {
        title: "Settings",
        link: "/settings",
        icon: FiSettings,
      },
    ],
  },
];
