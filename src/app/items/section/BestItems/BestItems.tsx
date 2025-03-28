// import "./BestItems.css";
import { ItemCard } from "../common/ui/ItemCard";
import { SkeletonCard } from "../common/ui/SkeletonCard";
import { Typo } from "@/shared/Typo/Typo";
import React from "react";
import { colorChips } from "@/shared/styles/colorChips";
import { Stack, useMediaQuery } from "@mui/material";
// import { useCodeitBestItems } from "../common/hooks/useCodeitItemListQuery";
import { useBestItems } from "../common/hooks/useItemListQuery";

export function BestItems(): React.ReactElement {
  const isMobile = useMediaQuery("(max-width: 774px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");

  // 기본 4개 받아온 뒤에 화면 크기에 따라 보여줄 개수 결정
  // const { products, isLoading } = useCodeitBestItems(4);
  const { products, isLoading } = useBestItems(4);
  const displayCount = isMobile ? 1 : isTablet ? 2 : 4;
  const displayProducts = products.slice(0, displayCount);

  const isShowSkeleton = isLoading || !products.length;

  return (
    <Stack direction="column" gap="16px">
      <Typo
        className={"text20Bold"}
        content="베스트 상품"
        color={colorChips.gray800}
      />
      <Stack sx={cardsBoxSx}>
        {isShowSkeleton
          ? Array.from({ length: displayCount }).map((_, idx) => (
              <SkeletonCard key={idx} variant="best" />
            ))
          : displayProducts.map((product, idx) => (
              <ItemCard key={idx} variant="best" product={product} />
            ))}
      </Stack>
    </Stack>
  );
}

const cardsBoxSx = {
  width: "100%",
  height: "fit-content",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  // flexWrap: "wrap",
  gap: "24px",
};
