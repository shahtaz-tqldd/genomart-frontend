import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalCount, limit, setPage }) => {
  return (
    <>
      {!totalCount <= limit && (
        <div className="lg:w-1/2 mx-auto my-12">
          <ReactPaginate
            breakLabel="..."
            previousLabel={
              <div className="p-2">
                <BiChevronLeft />
              </div>
            }
            previousClassName="border-gray-300 border-2 rounded-lg text-center mr-auto hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-500 transition duration-200 select-none"
            nextClassName="border-gray-300 border-2 rounded-lg text-center ml-auto hover:bg-emerald-50 hover:text-emerald-500 hover:border-emerald-500 transition duration-200 select-none"
            // activeLinkClassName="h-10 w-10 grid place-items-center"
            nextLabel={
              <div className="p-2">
                <BiChevronRight />
              </div>
            }
            onPageChange={(e) => setPage(e.selected + 1)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(totalCount / limit)}
            renderOnZeroPageCount={null}
            pageLinkClassName="h-8 w-8 grid place-items-center text-[14px]"
            className="flex items-center justify-between gap-2 select-none"
            pageClassName="rounded-lg"
            activeClassName="bg-emerald-500 text-white font-bold"
          />
        </div>
      )}
    </>
  );
};

export default Pagination;
