import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Popper,
} from "@mui/material";
import { dropdownbtn, scrollbar } from "../../ui/tailwind/tailwind-classes";
import { BiChevronDown } from "react-icons/bi";

const Dropdown = ({
  options,
  btnstyle = dropdownbtn,
  selectedOption,
  setSelectedOption,
  dropdownNull = "Select Option",
}) => {
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className={btnstyle}
      >
        {selectedOption || dropdownNull} <BiChevronDown />
      </button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        className="mt-1 z-10"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "right top" : "right bottom",
            }}
          >
            <Box
              className={`max-h-[260px] overflow-auto z-10 ${scrollbar}`}
              sx={{
                borderRadius: "8px", // Adjust the value as per your preference
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)", // Adjust the shadow properties
                bgcolor: "#fff",
                width: anchorRef.current
                  ? `${anchorRef.current.offsetWidth}px`
                  : "auto", // Set the width to match the button
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {options?.map((option, index) => (
                    <MenuItem
                      key={index}
                      sx={{
                        fontSize: btnstyle === dropdownbtn ? "12px" : "15px",
                      }}
                      onClick={() => handleOptionClick(option)}
                    >
                      <p>{option}</p>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Box>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default Dropdown;
