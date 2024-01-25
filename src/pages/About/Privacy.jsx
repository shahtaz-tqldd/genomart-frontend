import React from "react";
import { useGetSettingsInfoQuery } from "../../feature/dashboard/dashboardApiSlice";
import useTitle from "../../hooks/useTitle";
import ParsedText from "../../utiles/ParsedText";
import { defaultShopData } from "../../assets/data/defaultData";

const Privacy = () => {
  useTitle("Refund Policy");
  const { data } = useGetSettingsInfoQuery({}, { refetchOnReconnect: true });
  return (
    <div>
      <div className="bg-[#8ADAB2] py-14">
        <h2 className=" font-bold text-[80px] text-center text-white">
          Refund Policy
        </h2>
      </div>
      <div className="container mt-20">
        <ParsedText
          content={data?.data?.policy || defaultShopData?.policy}
          className={"text-gray-600"}
        />
      </div>
    </div>
  );
};

export default Privacy;
