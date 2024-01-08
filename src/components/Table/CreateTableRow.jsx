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
import { MdOutlineEditNote, MdAssignmentTurnedIn } from "react-icons/md";

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
          sx={{ marginLeft: "-3rem" }}
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
                padding: "5px",
                margin: "0 10px",
                borderRadius: "0.375rem",
                width: "120px",
              }}
              onClick={() => handleMenuAction(item)}>
              <div className="flex items-center gap-2 tex text-md text-gray-600">
                {item === "Edit" ? (
                  <MdOutlineEditNote className="text-xl" />
                ) : item === "View" ? (
                  <AiFillEye className="text-xl" />
                ) : item === "Assign Issue" ? (
                  <MdAssignmentTurnedIn className="text-lg" />
                ) : (
                  <HiTrash className="text-xl text-red-500" />
                )}
                <span className="mt-0.5">{item}</span>
              </div>
            </MenuItem>
          ))}
        </Menu>
      )}
    </React.Fragment>
  );
};

export default CreateTableRow;
