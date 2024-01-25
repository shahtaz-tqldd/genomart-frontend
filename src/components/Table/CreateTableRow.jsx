import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { HiTrash } from "react-icons/hi";
import { AiFillEye } from "react-icons/ai";
import { MdOutlineEditNote, MdOutlinePostAdd } from "react-icons/md";
import { TbArrowBackUpDouble, TbMessageReport, TbStatusChange } from "react-icons/tb";
import { CgSandClock } from "react-icons/cg";
import { BiSolidUserX } from "react-icons/bi";

const CreateTableRow = ({ item, columns, menuData, setAction, threeDot }) => {
  const [open, setOpen] = useState(false);
  const [openThreeDot, setOpenThreeDot] = useState(null);

  const handleThreeDotClick = (event) => {
    setOpenThreeDot(event.currentTarget);
  };
  const handleThreeDotClose = () => {
    setOpenThreeDot(null);
  };

  const handleMenuAction = (action) => {
    setAction({ action, itemId: item?.id, product: item?.productInfo });
    handleThreeDotClose();
  };

  return (
    <React.Fragment>
      <TableRow
        hover
        sx={{
          "& > *": {
            borderBottom: "none",
          },
        }}>
        {columns?.map((column, index) => (
          <TableCell
            key={index}
            sx={{
              color: "#655E5E",
              textAlign:
                index === 0
                  ? "left"
                  : index === columns?.length - 1 && !Boolean(item?.collasped)
                  ? "right"
                  : "center",
            }}>
            <div
              className={`${
                (column?.field === "status" &&
                  item?.status === "Active" &&
                  "text-green-600 bg-green-100 px-2 py-1 rounded text-sm font-bold") ||
                (item?.status === "Banned" &&
                  "text-red-600 bg-red-100 px-2 py-1 rounded text-sm font-bold")
              }`}>
              {item[column.field]}
            </div>
          </TableCell>
        ))}
        {threeDot === false ? null : (
          <TableCell
            sx={
              item?.collasped ? { textAlign: "right" } : { textAlign: "center" }
            }>
            {item?.collasped && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
            <IconButton
              id="basic-menu"
              aria-controls={Boolean(openThreeDot) ? "basic-menu" : undefined}
              aria-haspopup="true"
              sx={{ marginInlineStart: 3 }}
              aria-expanded={Boolean(openThreeDot) ? "true" : undefined}
              onClick={handleThreeDotClick}
              aria-label="delete"
              size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {item?.collasped && (
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, background: "#F4F6F8" }}
            colSpan={columns.length + 1}>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              style={{
                transition: "height 300ms",
                overflow: "hidden",
              }}>
              <Box sx={{ padding: "1rem 0" }}>{item?.collasped}</Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}

      {threeDot === false ? null : (
        <Menu
          sx={{ marginLeft: "-3rem", }}
          id="basic-menu"
          disableScrollLock={true}
          anchorEl={openThreeDot}
          open={openThreeDot}
          onClose={handleThreeDotClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}>
          {menuData?.map((item, index) => (
            <MenuItem
              sx={{
                padding: "5px 10px 5px 6px",
                margin: "0 10px 0 7px",
                borderRadius: "4px",
              }}
              onClick={() => handleMenuAction(item)}>
              <div className="flex items-center gap-2 tex text-sm font-semibold text-gray-600">
                {item === "Edit" ? (
                  <MdOutlineEditNote className="text-lg" />
                ) : item === "View" ? (
                  <AiFillEye className="text-lg" />
                ) : item === "Disable" ? (
                  <BiSolidUserX className="text-lg text-red-500" />
                ) : item === "Make Admin" ? (
                  <BiSolidUserX className="text-lg text-red-500" />
                ) : item === "Change Status" ? (
                  <TbStatusChange className="text-lg" />
                ) : item === "Special Offer" ? (
                  <MdOutlinePostAdd className="text-lg" />
                ) : item === "Report" ? (
                  <TbMessageReport className="text-lg" />
                ) : item === "Order Progress" ? (
                  <CgSandClock className="text-lg" />
                ) : item === "Refund" ? (
                  <TbArrowBackUpDouble className="text-lg" />
                ) : (
                  <HiTrash className="text-red-500 text-lg" />
                )}
                <span className={` ${item==="Delete" ? "text-red-500": item==="Disable" ? "text-red-500": "text-gray-600"}`}>{item}</span>
              </div>
            </MenuItem>
          ))}
        </Menu>
      )}
    </React.Fragment>
  );
};

export default CreateTableRow;
