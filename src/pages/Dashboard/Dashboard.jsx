import { useSelector } from "react-redux";
import { useGetStatsQuery } from "../../feature/dashboard/dashboardApiSlice";
import StatCard from "./shared/StatCard";
import { bgcolors } from "../../assets/data/colors";
import cart from "../../assets/images/cart.png";
import cart2 from "../../assets/images/cart2.png";
import tracking from "../../assets/images/tracking.png";
// import package from "../../assets/images/package.png"
import package2 from "../../assets/images/package2.png";

import BarChart from "../../components/Chart/BarChart";
import TotalProductCard from "./Dashboard/TotalProductCard";
import PiChart from "../../components/Chart/PiChart";
import { useGetAllCategoriesQuery } from "../../feature/products/productsApiSlice";
import TopSoldProducts from "./Dashboard/TopSoldProducts";
import Heading from "../../ui/Heading/Heading";
import NewOrders from "./Dashboard/NewOrders";
import SpecialOfferProducts from "./Dashboard/SpecialOfferProducts";

const Dashboard = () => {
  const { token } = useSelector((state) => state?.auth);
  const { data } = useGetStatsQuery(
    { token },
    { refetchOnReconnect: true, skip: !token }
  );
  const monthlySoldData = [
    120, 230, 200, 193, 420, 321, 200, 190, 110, 240, 110, 235,
  ];
  const { data: category } = useGetAllCategoriesQuery({
    refetchOnReconnect: true,
  });

  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        <StatCard
          num={data?.data?.totalOrders || 0}
          title={"Total Order"}
          color={bgcolors[3]}
          img={package2}
        />
        <StatCard
          num={data?.data?.totalPendingOrders || 0}
          title={"Pending Orders"}
          color={bgcolors[6]}
          img={cart2}
        />
        <StatCard
          num={data?.data?.totalProcessingOrders || 0}
          title={"Processing Orders"}
          color={bgcolors[2]}
          img={tracking}
        />
        <StatCard
          num={data?.data?.totalCompletedOrders || 0}
          title={"Completed Orders"}
          color={bgcolors[0]}
          img={cart}
        />
      </div>
      <div className="grid grid-cols-7 gap-16 mt-16">
        <div className="col-span-5">
          <BarChart data={monthlySoldData} name={"Monthly Sold"} />
        </div>
        <div className="col-span-2 mb-16">
          <TotalProductCard
            totalProducts={data?.data?.totalProducts || 0}
            totalStock={data?.data?.totalStock || 0}
            totalCategories={data?.data?.totalCategories || 0}
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-16 mt-20">
        <div className="col-span-3">
          <NewOrders />
        </div>
        <div className="col-span-2">
          <SpecialOfferProducts />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-16 mt-20">
        <div className="col-span-3">
          <TopSoldProducts />
        </div>
        <div className="col-span-2 flex flex-col gap-2 justify-between">
          <Heading title={"Product Categories"} />
          <PiChart data={category?.data || []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
