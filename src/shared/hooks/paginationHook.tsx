import { useState } from "react";

interface UsePaginationReturn {
  currentPage: number;
  currentRange: number;
  totalRanges: number;
  startPage: number;
  endPage: number;
  pageNums: number[];
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

export function usePagination(
  totalPageCount: number,
  currentPageProp: number,
  pagePerRange: number = 5
): UsePaginationReturn {
  // 현재 페이지를 props로 받아옴
  const [currentRange, setCurrentRange] = useState<number>(
    Math.ceil(currentPageProp / pagePerRange)
  );

  const totalRanges: number = Math.ceil(totalPageCount / pagePerRange);
  const startPage: number = (currentRange - 1) * pagePerRange + 1;
  const endPage: number = Math.min(currentRange * pagePerRange, totalPageCount);

  const pageNums: number[] = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );

  // 구간 이동 시 자동으로 해당 구간의 첫 페이지로 이동
  const handlePrevClick = (): void => {
    if (currentRange > 1) {
      setCurrentRange(currentRange - 1);
    }
  };

  const handleNextClick = (): void => {
    if (currentRange < totalRanges) {
      setCurrentRange(currentRange + 1);
    }
  };

  return {
    currentPage: currentPageProp,
    currentRange,
    totalRanges,
    startPage,
    endPage,
    pageNums,
    handlePrevClick,
    handleNextClick,
  };
}
