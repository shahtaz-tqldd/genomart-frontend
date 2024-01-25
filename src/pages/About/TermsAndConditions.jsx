import React from "react";
import { useGetSettingsInfoQuery } from "../../feature/dashboard/dashboardApiSlice";
import { defaultShopData } from "../../assets/data/defaultData";
import ParsedText from "../../utiles/ParsedText";
import useTitle from "../../hooks/useTitle";

const TermsAndConditions = () => {
  useTitle("Terms and Conditions");
  const { data } = useGetSettingsInfoQuery({}, { refetchOnReconnect: true });
  return (
    <div>
      <div className="bg-[#8ADAB2] py-14">
        <h2 className=" font-bold text-[80px] text-center text-white">
          Terms and Conditions
        </h2>
      </div>
      <div className="container mt-20">
        <ParsedText
          content={data?.data?.policy || defaultShopData?.terms}
          className={"text-gray-600"}
        />
      </div>
    </div>
  );
};

export default TermsAndConditions;
