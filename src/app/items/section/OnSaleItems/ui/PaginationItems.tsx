// import arrowLeft from "public/assets/arrow_left.png";
// import arrowRight from "public/assets/arrow_right.png";
import { usePagination } from "@/shared/hooks/paginationHook";
import React from "react";

interface PaginationItemsProps {
  currentPage: number;
  totalPageCount: number;
  onPageChange: (page: number) => void;
}

export const PaginationItems: React.FC<PaginationItemsProps> = ({
  currentPage = 1,
  totalPageCount = 1,
  onPageChange,
}) => {
  const { pageNums, handlePageClick, handlePrevClick, handleNextClick } =
    usePagination(totalPageCount);

  return (
    <div id="pagination-box">
      <div className="page-btn" onClick={handlePrevClick}>
        <img
          className="arrow-img"
          src={"assets/arrow_left.png"}
          alt="이전 페이지"
        />
      </div>

      {pageNums.map((page) => {
        return (
          <button
            className={`page-btn ${
              page === currentPage ? "selected" : ""
            } text-lg semibold`}
            onClick={() => {
              handlePageClick(page);
              onPageChange(page); //상위 컴포넌트에 선택한 페이지 전달
            }}
            key={page}
          >
            {page}
          </button>
        );
      })}

      <div className="page-btn" onClick={handleNextClick}>
        <img
          className="arrow-img"
          src={"assets/arrow_right.png"}
          alt="다음 페이지"
        />
      </div>
    </div>
  );
};
