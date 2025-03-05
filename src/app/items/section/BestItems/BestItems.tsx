import "./BestItems.css";
import { ItemCard } from "../common/ui/ItemCard";
import { SkeletonCard } from "../common/ui/SkeletonCard";
import { ORDER_BY } from "../../../../shared/utils/APIs/getItemsListAPI";
import { Typo } from "@/shared/Typo/Typo";
import { useMediaQuery } from "@/shared/hooks/mediaQueryHook";
import { useItemsFetch } from "../common/hooks/itemsFetchHook";
import React, { useState, useEffect } from "react";
import { colorChips } from "@/shared/styles/colorChips";
import { ScreenSizeType } from "@/shared/type";

//sizeConfig
const SCREEN_SIZES_TO_PAGE_SIZE: {
  MOBILE: number;
  TABLET: number;
  DESKTOP: number;
} = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
};

export function BestItems(): React.ReactElement {
  const screenSize: ScreenSizeType = useMediaQuery();
  const limit: number = SCREEN_SIZES_TO_PAGE_SIZE[screenSize];
  const [params, setParams] = useState<{
    limit: number;
    sort: string;
  }>({
    limit, //현재 screenSize에 해당하는 limit 쿼리로 전달
    sort: ORDER_BY.FAVORITE.value, //정렬 기준: 좋아요순
  });

  //screenSize가 변경될 때 쿼리의 limit만 업데이트
  useEffect(() => {
    setParams((prev) => ({ ...prev, limit }));
  }, [limit]);

  //api호출
  const { productList, isLoading } = useItemsFetch(params);

  const isShowSkeleton = isLoading || !productList.length;

  return (
    <section id="best-items">
      <Typo
        className={"text20Bold"}
        content="베스트 상품"
        color={colorChips.gray800}
      />
      <div className="cards-box">
        {isShowSkeleton
          ? Array.from({ length: limit }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : productList.map((product, idx) => (
              <ItemCard product={product} key={idx} />
            ))}
      </div>
    </section>
  );
}
