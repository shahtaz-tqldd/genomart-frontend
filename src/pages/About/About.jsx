import React from "react";
import { useGetSettingsInfoQuery } from "../../feature/dashboard/dashboardApiSlice";
import { defaultShopData } from "../../assets/data/defaultData";
import SocialMedia from "../../utiles/SocialMedia";
import Heading from "../../ui/Heading/Heading";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import useTitle from "../../hooks/useTitle";
import ShopReviews from "./Reviews";
import cart from "../../assets/images/cart.png";
import GridBackground from "../../ui/Elements/Grid";
const About = () => {
  useTitle("About");
  const { data } = useGetSettingsInfoQuery({}, { refetchOnReconnect: true });
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/10 to-rose-50 pt-32 pb-20 relative">
        <GridBackground />
        <div className="relative z-10">
          <img src={cart} className="h-20 mx-auto" alt="" />
          <h2 className="font-bold lg:text-[80px] md:text-[60px] text-[40px] text-center text-black/80">
            Welcome to{" "}
            <span className="text-primary">
              {data?.data?.name || defaultShopData?.name}
            </span>
          </h2>
          <p className="text-gray-800 text-lg container lg:px-20 md:px-10 text-center">
            {data?.data?.description || defaultShopData?.description}
          </p>
          <div className="flex justify-center mt-10">
            <SocialMedia about={true} />
          </div>
        </div>
      </div>

      <div className="container mt-12 text-slate-800">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 mb-20">
          <div>
            <Heading title={"Shop Location"} />
            <p className="text-xl">
              {data?.data?.location || defaultShopData?.location}
            </p>
            <div className="text-md flex items-center gap-2 mt-4">
              <BiSolidPhoneCall />
              {data?.data?.contact || defaultShopData?.contact}
            </div>

            <div className="text-md flex items-center gap-2 mt-2">
              <MdOutlineMail />
              {data?.data?.email || defaultShopData?.email}
            </div>
          </div>
          <div>
            <img
              src={defaultShopData?.map}
              alt=""
              className="h-[350px] w-full object-cover rounded-xl"
            />
          </div>
        </div>

        <Heading title="Our Shops" />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-5 mb-20">
          {defaultShopData?.shopImages?.map((img, i) => (
            <div key={i} className="group overflow-hidden rounded-xl">
              <img
                src={img}
                className="object-cover w-full rounded-xl md:h-[320px] h-[260px] group-hover:scale-105 tr"
                alt=""
              />
            </div>
          ))}
        </div>

        <ShopReviews />
      </div>
    </div>
  );
};

export default About;
