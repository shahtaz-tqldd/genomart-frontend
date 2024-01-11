import React from "react";
import { Menu } from "@mui/material";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const ColorPickerComponent = ({ openMenu, setOpenMenu, onClick }) => {
  const [color, setColor] = useColor("");
  const handleMenuClose = () => setOpenMenu(false);
  return (
    <Menu
      id="basic-menu"
      sx={{ opacity: 0.98 }}
      // disableScrollLock={true}
      anchorEl={openMenu}
      open={Boolean(openMenu)}
      onClose={handleMenuClose}
      className=""
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      PaperProps={{
        sx: {
          borderRadius: "8px",
          backgroundImage: "linear-gradient(45deg, #fff, #fff)",
        },
      }}
    >
      <div className="px-2 w-[280px] bg-white border">
        <ColorPicker
          hideInput={["rgb", "hsv"]}
          color={color}
          onChange={setColor}
        />
        <div className="grid grid-cols-2 gap-3 px-3 mt-4 mb-2">
          <button
            onClick={handleMenuClose}
            className="py-2 w-full text-sm bg-gray-200 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClick(color?.hex);
              handleMenuClose();
            }}
            // style={{backgroundColor:hover color.hex}}
            className="py-2 w-full text-sm text-white bg-primaryColor tr border rounded-lg"
          >
            Select
          </button>
        </div>
      </div>
    </Menu>
  );
};

export default ColorPickerComponent;
