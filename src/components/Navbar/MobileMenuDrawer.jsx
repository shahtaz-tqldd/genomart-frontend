import { SwipeableDrawer } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { socialLink } from "../../assets/data/social-media";

const MobileMenuDrawer = ({ state, setState, toggleDrawer, data }) => {
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    navigate(link);
    setState({ left: false });
  };

  return (
    <div className="w-full absolute">
      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <div className="md:w-[400px] w-[60vw] py-5 px-8 h-full relative">
          <Link to={"/"} className="text-3xl font-nav hover:text-black tr">
            geno mart
          </Link>
          <div className="flex flex-col gap-2 mt-6">
            {data?.map((d, i) => (
              <button
                onClick={() => handleNavigate(d.link)}
                key={i}
                className="group"
              >
                <div className="fl gap-1.5">
                  {/* <d.icon /> */}
                  {d.title}
                </div>
              </button>
            ))}
          </div>
          <div className="fl gap-5 absolute bottom-10 left-1/2 -translate-x-1/2">
            {socialLink?.map((link, index) => (
              <a
                key={index}
                href={link?.link}
                className="text-gray-800 text-lg hover:text-primary transition duration-300"
                target="_blank"
              >
                {link.icon()}
              </a>
            ))}
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default MobileMenuDrawer;
