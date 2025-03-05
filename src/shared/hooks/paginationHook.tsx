import { useState } from "react";

interface UsePaginationReturn {
  currentPage: number;
  currentRange: number;
  totalRanges: number;
  startPage: number;
  endPage: number;
  pageNums: number[];
  handlePageClick: (page: number) => void;
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

export function usePagination(
  totalPageCount: number,
  pagePerRange: number = 5
): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState<number>(1); //현재 페이지
  const [currentRange, setCurrentRange] = useState<number>(1); //현재 구간

  const totalRanges: number = Math.ceil(totalPageCount / pagePerRange); //전체 구간 수

  //현재 구간의 시작과 끝 페이지 계산
  const startPage: number = (currentRange - 1) * pagePerRange + 1;
  const endPage: number = Math.min(currentRange * pagePerRange, totalPageCount); //마지막 구간에서는 있는 페이지까지만 버튼 생성

  //현재 구간의 페이지 번호 리스트 배열로 만들기
  const pageNums: number[] = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );

  //페이지 선택 핸들러
  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  //구간 이동
  const handlePrevClick = (): void => {
    if (currentRange > 1) setCurrentRange(currentRange - 1);
  };

  const handleNextClick = (): void => {
    if (currentRange < totalRanges) setCurrentRange(currentRange + 1);
  };

  return {
    currentPage,
    currentRange,
    totalRanges,
    startPage,
    endPage,
    pageNums,
    handlePageClick,
    handlePrevClick,
    handleNextClick,
  };
}
