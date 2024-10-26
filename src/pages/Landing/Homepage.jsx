import { useGetSettingsInfoQuery } from "../../feature/dashboard/dashboardApiSlice";
import useTitle from "../../hooks/useTitle";
import Banner from "./blocks/Banner";
import HomeCategories from "./blocks/HomeCategories";
import Features from "./blocks/Features";
import HomeProducts from "./blocks/HomeProducts";
import PickOfTheDayProducts from "./blocks/PickOfTheDayProducts";
import SpecialOfferProducts from "./blocks/SpecialOfferProducts";
import TopSale from "./blocks/TopSale";
import HeroNew from "./blocks/HeroNew";

const Homepage = () => {
  const { data: info } = useGetSettingsInfoQuery(
    {},
    { refetchOnReconnect: true }
  );
  useTitle(info?.data?.name || "Shop Name");
  return (
    <div>
      <HeroNew />
      <HomeCategories />
      <HomeProducts />
      <SpecialOfferProducts specialOffer={info?.data?.specialOffer} />
      <Banner banners={info?.data?.banners || []} />
      <PickOfTheDayProducts />
      <TopSale />
      <Features />
    </div>
  );
};

export default Homepage;
