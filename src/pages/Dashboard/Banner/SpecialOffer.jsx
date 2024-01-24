import React from "react";
import Greetings from "../../../utiles/Greetings";
import { useGetSettingsInfoQuery } from "../../../feature/dashboard/dashboardApiSlice";

const SpecialOffer = () => {
  const { data: info, isSuccess } = useGetSettingsInfoQuery(
    {},
    { refetchOnReconnect: true }
  );
  return (
    <div>
      <Greetings page={"Special Offer"} />
      <div className="grid grid-cols-5 gap-8 mt-10">
        {info?.data?.specialOffer?.length > 0 && (
          <div className="col-span-3 bg-[#CDF0EA] rounded-xl px-12 py-4 justify-between flex items-center">
            <div>
              <h2 className="text-md text-red-600 mb-2 font-bold">
                Sale 35% off
              </h2>
              <h2 className="text-2xl font-medium">
                {info?.data?.specialOffer[0]?.name}
              </h2>
              {/* <button className="text-lg mt-6 flex items-center gap-3 text-gray-700 hover:text-gray-800 hover:gap-5 tr">
                Buy Now <FaArrowRightLong />
              </button> */}
            </div>
            <img
              src={info?.data?.specialOffer[0]?.images[1]?.url}
              alt=""
              className="h-60 p-10"
            />
          </div>
        )}
        {info?.data?.specialOffer?.length > 1 && (
          <div className="col-span-2 bg-[#B6C9F0] rounded-xl px-8 py-4 flex items-center">
            <div>
              <h2 className="text-md text-red-600 mb-2 font-bold">
                Sale 35% off
              </h2>
              <h2 className="text-xl font-medium">
                {info?.data?.specialOffer[1]?.name}
              </h2>
              {/* <button className="text-lg mt-6 flex items-center gap-3 text-gray-700 hover:text-gray-800 hover:gap-5 tr">
                Buy Now <FaArrowRightLong />
              </button> */}
            </div>
            <img
              src={info?.data?.specialOffer[1]?.images[1]?.url}
              alt=""
              className="h-60 p-10"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialOffer;
