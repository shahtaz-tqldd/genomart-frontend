import { useGetSettingsInfoQuery } from "../../feature/dashboard/dashboardApiSlice";
import useTitle from "../../hooks/useTitle";
import Banner from "./blocks/Banner";
import HomeCategories from "./blocks/HomeCategories";
import Features from "./blocks/Features";
import HomeProducts from "./blocks/HomeProducts";
import PickOfTheDayProducts from "./blocks/PickOfTheDayProducts";
import SpecialOfferProducts from "./blocks/SpecialOfferProducts";
import TopSale from "./blocks/TopSale";

const Homepage = () => {
  const { data: info } = useGetSettingsInfoQuery(
    {},
    { refetchOnReconnect: true }
  );
  useTitle(info?.data?.name || "Shop Name");
  return (
    <div>
      <Banner banners={info?.data?.banners || []} />
      <HomeCategories />
      <Features />
      <HomeProducts />
      <SpecialOfferProducts specialOffer={info?.data?.specialOffer} />
      <PickOfTheDayProducts />
      <TopSale />
    </div>
  );
};

export default Homepage;
