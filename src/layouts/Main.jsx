import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import AuthModal from "../components/AuthModal/AuthModal";

const Main = () => {
  const authModal = useSelector((state) => state?.authModal);
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
      {authModal?.isOpen && <AuthModal />}
    </React.Fragment>
  );
};

export default Main;
