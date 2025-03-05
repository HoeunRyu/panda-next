import { useResponseSort } from "@/shared/hooks/responseSortHook";
import { ORDER_BY } from "@/shared/utils/APIs/getItemsListAPI";
import { OrderByItem } from "@/shared/type";
import React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import Image from "next/image";

//ORDER_BY의 값만 배열로 가져오기
const ORDER_BY_VALUE_ARR: OrderByItem[] = Object.values(ORDER_BY);

interface SortArticlesProps {
  onSortChange: (sort: string) => void;
}

export const SortArticles: React.FC<SortArticlesProps> = ({ onSortChange }) => {
  const isMobile = useMediaQuery("(max-width:744px)");
  const { selectedName, showDropdown, handleSelectSort, toggleDropdown } =
    useResponseSort(ORDER_BY.RECENT); //초기값은 "최신순"으로 설정

  const sortItemsIcon: string = isMobile
    ? "/assets/mobile_sort_icon.png"
    : "/assets/sort_icon.png";

  return (
    <Stack onClick={toggleDropdown} sx={sortArticlesWrapperStyle}>
      {!isMobile && (
        <Typo
          className="text16Regular"
          content={selectedName}
          color={colorChips.gray800}
          sx={selectedNameStyle}
        />
      )}
      <Image src={sortItemsIcon} alt="정렬 아이콘" width={24} height={24} />

      {showDropdown && (
        <Stack sx={dropdownMenuStyle}>
          {ORDER_BY_VALUE_ARR.map((item) => (
            <Typo
              key={item.value}
              className="text16Regular"
              content={item.name}
              color={colorChips.gray800}
              onClick={() => {
                handleSelectSort(item);
                onSortChange(item.value);
              }}
              sx={dropdownOptionStyle}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
const sortArticlesWrapperStyle = {
  width: { xs: "42px", sm: "130px" },
  height: "42px",
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
  borderRadius: "12px",
  border: `1px solid ${colorChips.gray200}`,
  color: colorChips.gray800,
  cursor: "pointer",
  boxSizing: "border-box",
  flexShrink: 0,
};

const selectedNameStyle = {
  fontFamily: "Pretendard",
  fontSize: "16px",
  fontWeight: "400",
  whiteSpace: "nowrap",
  textAlign: "center",
} as const;

const dropdownMenuStyle = {
  position: "absolute",
  top: "50px",
  right: "0px",
  width: "130px",
  backgroundColor: "#ffffff",
  border: `1px solid ${colorChips.gray200}`,
  borderRadius: "12px",
  overflow: "hidden",
  zIndex: 2,
};

const dropdownOptionStyle = {
  fontFamily: "Pretendard",
  fontSize: "16px",
  fontWeight: "400",
  width: "100%",
  textAlign: "center",
  whiteSpace: "nowrap",
  cursor: "pointer",
  borderBottom: `1px solid ${colorChips.gray200}`,
  margin: "0 auto",
  padding: "8px 0",
  "&:last-child": {
    borderBottom: "none",
  },
} as const;
