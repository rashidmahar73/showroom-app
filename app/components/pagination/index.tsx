import React from "react";

import { usePagination, DOTS } from "@/app/hooks";

import { PaginationArrowLeftIcon, PaginationArrowRightIcon } from "@/app/icons";

type TPaginationProps = {
  currentPage: number;
  siblingCount?: number;
  onPageChange: (pageNumber: number) => void;
  pagination: { pageSize: number; totalPages: number };
  isLoading: boolean;
};

function Pagination({
  currentPage,
  siblingCount = 1,
  onPageChange,
  pagination,
}: TPaginationProps) {
  const { pageSize, totalPages } = pagination;

  const paginationRange: any = usePagination({
    currentPage,
    totalPages,
    siblingCount,
    pageSize,
  });

  const modifiedPaginationRange =
    paginationRange !== undefined ? paginationRange : [];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  if (totalPages < 2) {
    return <ul className="flex justify-center mt-3" id="paginationDiv"></ul>;
  }

  return (
    <ul className="flex justify-center mt-3" id="paginationDiv">
      <li
        className={`relative inline-flex items-center ${
          currentPage === 1
            ? "cursor-default"
            : "bg-[#008080]/50 cursor-pointer"
        } rounded-[100%] px-2 py-2 text-gray-400 `}
        onClick={currentPage === 1 ? () => {} : () => onPrevious()}
      >
        <PaginationArrowLeftIcon />
      </li>
      {modifiedPaginationRange.map((pageNumber: any, index: number) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={`paginator-dots-${pageNumber}`}
              className="pagination-item dots"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={`paginator-${index}`}
            className={`relative liClass w-[40px] inline-flex items-center justify-center text-black ${
              pageNumber === currentPage
                ? "bg-[#008080] text-white hover:bg-[#008080]"
                : ""
            } px-4 py-2 text-sm m-0 font-semibold text-[11.45px] cursor-pointer leading-[16.36px] font-medium hover:bg-[#008080] hover:text-white focus:z-20 focus:outline-offset-0 rounded-[100%]`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`relative inline-flex items-center px-2 py-2 text-gray-400 ${
          currentPage === totalPages
            ? "cursor-default"
            : "bg-[#008080]/50 cursor-pointer"
        } rounded-[100%]`}
        onClick={currentPage === totalPages ? () => {} : () => onNext()}
      >
        <PaginationArrowRightIcon />
      </li>
    </ul>
  );
}

export { Pagination };
