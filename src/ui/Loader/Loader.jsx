import "../../assets/styles/loader.css";
import cart from "../../assets/images/cart.png";

const Loader = () => (
  <div className="w-screen h-screen grid place-items-center">
    <div className="flex flex-col gap-2">
      <img src={cart} alt="" className="h-16 object-contain -ml-2" />
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default Loader;
