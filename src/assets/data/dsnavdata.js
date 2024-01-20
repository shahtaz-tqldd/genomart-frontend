import { MdAutoGraph } from "react-icons/md";
import { FiSettings, FiUsers } from "react-icons/fi";

import { TbBrandBackbone, TbBrandFirebase, TbBrandAppgallery } from "react-icons/tb";

import { IoCartOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { LuBox } from "react-icons/lu";
import { RiCustomerServiceLine } from "react-icons/ri";
import { GrCodeSandbox } from "react-icons/gr";

export const dsnavdata = [
  {
    stackName: "Overview",
    data: [
      {
        title: "Dashboard",
        link: "/dashboard",
        icon: RxDashboard,
      },
      // {
      //   title: "Analytics",
      //   link: "/dashboard/analytics",
      //   icon: MdAutoGraph,
      // },
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
        icon: LuBox,
      },

      {
        title: "Featured",
        link: "/banners",
        icon: GrCodeSandbox,
        children: [
          {
            title: "Hero Banner",
            link: "/dashboard/banner",
            icon: TbBrandBackbone,
          },
          {
            title: "Special Offer",
            link: "/dashboard/special-offer",
            icon: TbBrandFirebase,
          },
          ,
        ],
      },
    ],
  },

  {
    stackName: "Support",
    data: [
      {
        title: "Customer Support",
        link: "/dashboard/customer-support",
        icon: RiCustomerServiceLine,
      },
      {
        title: "Settings",
        link: "/dashboard/settings",
        icon: FiSettings,
      },
    ],
  },
];
