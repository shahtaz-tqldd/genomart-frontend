import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import AuthModal from "../components/Modals/AuthModal";

const Main = () => {
  const authModal = useSelector((state) => state?.authModal);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      {authModal?.isOpen && <AuthModal />}
    </div>
  );
};

export default Main;
