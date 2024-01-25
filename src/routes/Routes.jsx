import { createBrowserRouter } from "react-router-dom";
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

import CustomerSupport from "../pages/Dashboard/CustomerSupport/CustomerSupport";
import Settings from "../pages/Dashboard/Settings/Settings";
import BannerList from "../pages/Dashboard/Banner/BannerList";
import Profile from "../pages/Profile/Profile";
import InfoPage from "../pages/Profile/InfoPage";
import Wishlistpage from "../pages/Profile/Wishlistpage";
import MyOrder from "../pages/Profile/MyOrder/MyOrder";
import ResponsePage from "../pages/Profile/ResponsePage";
import ContactPage from "../pages/Contact/ContactPage";
import About from "../pages/About/About";
import Privacy from "../pages/About/Privacy";
import TermsAndConditions from "../pages/About/TermsAndConditions";
import SpecialOffer from "../pages/Dashboard/SpecialOffer/SpecialOffer";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/policy",
        element: <Privacy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute
            allowedRoles={["admin", "user", "super admin"]}
            path={"/products"}
          >
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders/confirm",
        element: (
          <PrivateRoute
            allowedRoles={["admin", "user", "super admin"]}
            path={"/products"}
          >
            <ConfirmOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute
            allowedRoles={["admin", "user", "super admin"]}
            path={"/products"}
          >
            <Profile />
          </PrivateRoute>
        ),
        children: [
          { path: "/profile/my-info", element: <InfoPage /> },
          { path: "/profile/wishlist", element: <Wishlistpage /> },
          { path: "/profile/my-orders", element: <MyOrder /> },
          { path: "/profile/response", element: <ResponsePage /> },
        ],
      },
    ],
  },
  // admin dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["admin", "super admin"]} path={"/"}>
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
        path: "/dashboard/special-offer",
        element: <SpecialOffer />,
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
