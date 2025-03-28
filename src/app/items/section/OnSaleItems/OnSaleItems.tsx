import "./OnSaleItems.css";
import { SearchItems } from "./ui/SearchItems";
import { PostItems } from "./ui/PostItems";
import { SortItems } from "./ui/SortItems";
import { ItemCard } from "../common/ui/ItemCard";
import { PaginationItems } from "./ui/PaginationItems";
import { Typo } from "@/shared/Typo/Typo";
import { SkeletonCard } from "../common/ui/SkeletonCard";
import { colorChips } from "@/shared/styles/colorChips";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { useSearchStore } from "../common/hooks/useSearchStore";
// import { useCodeitItemList } from "../common/hooks/useCodeitItemListQuery";
import { useEffect } from "react";
import { useItemList } from "../common/hooks/useItemListQuery";

export function OnSaleItems() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const pageSize = isMobile ? 4 : isTablet ? 6 : 10;

  const { updateParams, params } = useSearchStore();
  // const { products, totalCount, currentPage, isLoading } = useCodeitItemList();
  const { products, totalCount, currentPage, isLoading } = useItemList();

  // 화면 크기 변경 시 pageSize가 변경될 때만 업데이트
  useEffect(() => {
    if (params.pageSize !== pageSize) {
      updateParams("pageSize", pageSize.toString());
      updateParams("page", "1"); // 페이지 크기가 변경되면 첫 페이지로 이동
    }
  }, [pageSize, params.pageSize]);

  // 검색어 변경 핸들러
  const handleSearch = (keyword: string) => {
    updateParams("keyword", keyword);
    updateParams("page", "1"); // 검색 시 첫 페이지로 이동
  };

  // 정렬 변경 핸들러
  const handleSort = (orderBy: string) => {
    updateParams("orderBy", orderBy);
    updateParams("page", "1"); // 정렬 변경 시 첫 페이지로 이동
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    updateParams("page", page.toString());
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const isShowSkeleton = isLoading || !products.length;

  return (
    <section id="on-sale-items">
      <div className="section-top">
        <Typo
          className={"text20Bold"}
          color={colorChips.gray800}
          content="판매 중인 상품"
        />
        <div className="utility-box">
          <SearchItems onSearch={handleSearch} />
          <PostItems />
          <SortItems onSortChange={handleSort} />
        </div>
      </div>

      <Stack sx={cardsBoxSx}>
        {isShowSkeleton
          ? Array.from({ length: pageSize }).map((_, idx) => (
              <SkeletonCard key={idx} variant="all" />
            ))
          : products.map((product) => (
              <ItemCard key={product.id} variant="all" product={product} />
            ))}
      </Stack>

      <PaginationItems
        page={currentPage}
        count={totalPages}
        handleChange={(event, value) => handlePageChange(value)}
      />
    </section>
  );
}

const cardsBoxSx = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(2, 1fr)", // 744px 이하
    sm: "repeat(3, 1fr)", // 744px ~ 1200px
    md: "repeat(5, 1fr)", // 1200px 이상
  },
  gridTemplateRows: "repeat(2, 1fr)",
  gap: "24px",
};
