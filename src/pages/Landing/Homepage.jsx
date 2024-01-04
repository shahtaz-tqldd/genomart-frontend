import Banner from "./Banner/Banner";
import HomeCategories from "./Categories/HomeCategories";
import Features from "./Features/Features";
import HomeProducts from "./HomeProducts/HomeProducts";
import PickOfTheDayProducts from "./PickOfTheDayProducts/PickOfTheDayProducts";
import SpecialOfferProducts from "./SpecialOfferProducts/SpecialOfferProducts";
import TopSale from "./TopSale/TopSale";

const Homepage = () => {
  return (
    <div>
      <Banner />
      <HomeCategories />
      <Features/>
      <HomeProducts/>
      <SpecialOfferProducts/>
      <PickOfTheDayProducts/>
      <TopSale/>
    </div>
  );
};

export default Homepage;
