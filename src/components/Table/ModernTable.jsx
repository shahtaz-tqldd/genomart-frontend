import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateTableRow from "./CreateTableRow";
import Pagination from "../../utiles/Pagination";

const ModernTable = ({
  columns,
  data,
  menuData,
  setAction,
  totalCount,
  setPage,
  limit,
  threeDot,
}) => {
  return (
    <TableContainer
      sx={{
        boxShadow: "none",
        border: "1px solid #e4e4e4",
        borderRadius: "12px",
      }}
      component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ backgroundColor: "#F6F7F8" }}>
          <TableRow>
            {columns?.map((cell, index) => (
              <TableCell
                key={index}
                sx={{
                  textAlign:
                    index === 0
                      ? "left"
                      : index === columns?.length - 1 &&
                        Boolean(data?.collasped)
                      ? "right"
                      : "center",
                  color: "#655E5E",
                  fontSize: "14px",
                  fontWeight: 600,
                }}>
                {cell.header}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <CreateTableRow
              key={index}
              item={item}
              columns={columns}
              setAction={setAction}
              menuData={menuData}
              threeDot={threeDot}
            />
          ))}
        </TableBody>
      </Table>
      {totalCount > 10 && (
        <div className="-my-6">
          <Pagination setPage={setPage} totalCount={totalCount} limit={10} />
        </div>
      )}
      {totalCount <= 0 && (
        <h2 className="text-2xl text-gray-500 my-20 text-center lg:mr-20 mr-0">
          No Data Found!
        </h2>
      )}
    </TableContainer>
  );
};

export default ModernTable;
