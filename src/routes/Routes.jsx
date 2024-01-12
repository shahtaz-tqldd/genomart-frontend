import { createBrowserRouter } from "react-router-dom";
import UserRoute from "./UserRoute";
import PrivateRoute from "./PrivateRoute";
import Homepage from "../pages/Landing/Homepage";
import Main from "../layouts/Main";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/Products/ProductDetails";
import Checkout from "../pages/Checkout/Checkout";
import ConfirmOrder from "../pages/Checkout/ConfirmOrder";
import Errorpage from "../components/Errorpage";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProductList from "../pages/Dashboard/Products/ProductList";
import AddProduct from "../pages/Dashboard/Products/AddProduct";
import UserList from "../pages/Dashboard/Users/UserList";
import OrderList from "../pages/Dashboard/Orders/OrderList";
import Analytics from "../pages/Dashboard/Analytics/Analytics";
import SpecialOffer from "../pages/Dashboard/Banner/SpecialOffer";
import TrendingProducts from "../pages/Dashboard/Banner/TrendingProducts";

import CustomerSupport from "../pages/Dashboard/CustomerSupport/CustomerSupport";
import Settings from "../pages/Dashboard/Settings/Settings";
import BannerList from "../pages/Dashboard/Banner/BannerList";
import CreateBanner from "../pages/Dashboard/Banner/CreateBanner";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute
      // allowedRoles={["Admin", "User", "HR", "Line Manager", "Super Admin"]}
      // path={"/login"}>
      <Main />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/orders/confirm",
        element: <ConfirmOrder />,
      },
    ],
  },
  // admin dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["Admin", "User", "Super Admin"]} path={"/"}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/analytics",
        element: <Analytics />,
      },
      {
        path: "/dashboard/products",
        element: <ProductList />,
      },
      {
        path: "/dashboard/products/add-product",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/users",
        element: <UserList />,
      },
      {
        path: "/dashboard/orders",
        element: <OrderList />,
      },
      {
        path: "/dashboard/banner",
        element: <BannerList />,
      },
      {
        path: "/dashboard/banner/create-banner",
        element: <CreateBanner />,
      },
      {
        path: "/dashboard/banner/update-banner",
        element: <CreateBanner />,
      },
      {
        path: "/dashboard/special-offer",
        element: <SpecialOffer />,
      },
      {
        path: "/dashboard/trending-products",
        element: <TrendingProducts />,
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      },
      {
        path: "/dashboard/customer-support",
        element: <CustomerSupport />,
      },
    ],
  },

  {
    path: "*",
    element: <Errorpage />,
  },
]);
