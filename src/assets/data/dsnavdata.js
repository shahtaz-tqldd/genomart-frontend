import {
  AiOutlineBarChart,
  AiOutlineProfile,
  AiFillInstagram,
} from "react-icons/ai";
import { FiEdit, FiUsers } from "react-icons/fi";
import {
  BiWorld,
  BiSpreadsheet,
  BiBookContent,
  BiTrendingUp,
} from "react-icons/bi";
import { BsViewList } from "react-icons/bs";
import { FiUserCheck, FiPhone } from "react-icons/fi";
import { GoLightBulb } from "react-icons/go";
import { CgMenuBoxed } from "react-icons/cg";
import { HiOutlineDocumentText, HiOutlineKey } from "react-icons/hi";
import {
  IoCartOutline,
  IoPaperPlaneOutline,
  IoDuplicateOutline,
} from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import {
  MdOutlinePercent,
  MdOutlineCampaign,
  MdOutlinePermMedia,
  MdCampaign,
  MdOutlineFacebook,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import {
  RiCheckboxMultipleBlankFill,
  RiCustomerServiceLine,
} from "react-icons/ri";
import {
  TbBrandNuxt,
  TbBrandJuejin,
  TbAffiliate,
  TbUsers,
  TbTableFilled,
  TbBrandSupabase,
} from "react-icons/tb";
import { RiShieldUserFill, RiFileUserFill, RiUserFill } from "react-icons/ri";
import { SlCalculator } from "react-icons/sl";

export const dsnavdata = [
  {
    stackName: "Overview",
    data: [
      {
        title: "Dashboard",
        link: "/",
        icon: RxDashboard,
      },
      {
        title: "Analytics",
        link: "/analytics",
        icon: AiOutlineBarChart,
        children: [
          {
            title: "Website",
            link: "/analytics/website",
            icon: BiWorld,
          },
          {
            title: "Campaign",
            link: "/analytics/campaign",
            icon: MdCampaign,
          },
          {
            title: "Facebook Reach",
            link: "/analytics/facebook",
            icon: MdOutlineFacebook,
          },
        ],
      },
    ],
  },
  {
    stackName: "Management",
    data: [
      {
        title: "Users",
        link: "/users",
        icon: FiUsers,
        children: [
          {
            title: "All users",
            link: "/users/all-users",
            icon: RiUserFill,
          },
        ],
      },
      {
        title: "Orders",
        link: "/order-report",
        icon: IoCartOutline,
      },

      {
        title: "Products",
        link: "/products",
        icon: AiOutlineProfile,
        children: [
          {
            title: "List",
            link: "/products/list",
            icon: BsViewList,
          },
          {
            title: "New Product",
            link: "/products/create",
            icon: IoDuplicateOutline,
          },
        ],
      },
      {
        title: "Campaign",
        link: "/campaign",
        icon: MdOutlineCampaign,
        children: [
          {
            title: "All Campaign",
            link: "/campaign/all-campaign",
            icon: BiSpreadsheet,
          },
          {
            title: "Create",
            link: "/campaign/add-campaign",
            icon: FiEdit,
          },
        ],
      },
      {
        title: "Brand",
        link: "/brands",
        icon: TbBrandNuxt,
        children: [
          {
            title: "List",
            link: "/brands/all-brands",
            icon: BsViewList,
          },
          {
            title: "Create",
            link: "/brands/create",
            icon: FiEdit,
          },
          {
            title: "Expected Brand",
            link: "/brands/expected-brand",
            icon: BsViewList,
          },
          {
            title: "Brand Cap",
            link: "/brands/cap",
            icon: TbBrandSupabase,
          },
        ],
      },
      {
        title: "Content",
        link: "/content",
        icon: BiBookContent,
        children: [
          {
            title: "Blog",
            link: "/content/blog/all-blogs",
            icon: HiOutlineDocumentText,
          },
          {
            title: "Add Blog SEO",
            link: "/content/blog/seo",
            icon: HiOutlineDocumentText,
          },
        ],
      },
      {
        title: "Banner",
        link: "/banners",
        icon: TbBrandJuejin,
        children: [
          {
            title: "List",
            link: "/banners/all-banners",
            icon: BsViewList,
          },
          {
            title: "Create",
            link: "/banners/create-banner",
            icon: FiEdit,
          },
        ],
      },
    ],
  },
  {
    stackName: "Sections",
    data: [
      {
        title: "Refer and Earn",
        link: "/refer-and-earn",
        icon: IoPaperPlaneOutline,
      },
      {
        title: "Affiliate",
        link: "/affiliate",
        icon: TbAffiliate,
      },
      {
        title: "Trending",
        link: "/trending",
        icon: BiTrendingUp,
      },
      {
        title: "Know Inside Out",
        link: "/know-inside-out",
        icon: GoLightBulb,
      },
      {
        title: "Share Happiness & Joy",
        link: "/share-happiness-and-joy/list",
        icon: TbUsers,
      },
    ],
  },
  {
    stackName: "Marketing",
    data: [
      {
        title: "Social Media",
        link: "/social-media",
        icon: MdOutlinePermMedia,
        children: [
          {
            title: "Facebook",
            link: "/social-media/facebook",
            icon: MdOutlineFacebook,
          },
          {
            title: "Instagram",
            link: "/social-media/instagram",
            icon: AiFillInstagram,
          },
        ],
      },
    ],
  },
  {
    stackName: "Others",
    data: [
      {
        title: "Role Request",
        link: "/roles/user/request-role",
        icon: FiUserCheck,
        children: [
          {
            title: "User Role",
            link: "/roles",
            icon: RiShieldUserFill,
          },
          {
            title: "Admin Roles",
            link: "/roles/all-roles",
            icon: RiFileUserFill,
            roles: ["Admin", "Super Admin"],
          },
          {
            title: "Role Request",
            link: "/roles/role-request",
            icon: TbTableFilled,
            roles: ["Admin", "Super Admin"],
          },
        ],
      },
      {
        title: "Calculator",
        link: "/calculator",
        icon: SlCalculator,
        children: [
          {
            title: "Cashback Amount",
            link: "/calculator/cashback-amount",
            icon: GiMoneyStack,
          },
          {
            title: "Affiliate Commission",
            link: "/calculator/affiliate-commission",
            icon: MdOutlinePercent,
          },
        ],
      },
      {
        title: "Monthly Target",
        link: "/monthly-target",
        icon: MdOutlineCalendarMonth,
        children: [
          {
            title: "Set Target",
            link: "/monthly-target/set-target",
            icon: GiMoneyStack,
          },
          {
            title: "Cashback Target",
            link: "/monthly-target/cashback-target",
            icon: GiMoneyStack,
          },
          {
            title: "Affiliate Target",
            link: "/monthly-target/affiliate-target",
            icon: MdOutlinePercent,
          },
        ],
      },
      {
        title: "Generate ID",
        link: "/generate-id",
        icon: HiOutlineKey,
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
        children: [
          {
            title: "All Issues",
            link: "/customer-support",
            icon: CgMenuBoxed,
          },
          {
            title: "My Issues",
            link: "/customer-support/my-assigned",
            icon: RiCheckboxMultipleBlankFill,
          },
        ],
      },
      {
        title: "FAQ",
        link: "/faq",
        icon: GoQuestion,
      },
      {
        title: "Contact Us",
        link: "/contact-us",
        icon: FiPhone,
      },
    ],
  },
];

