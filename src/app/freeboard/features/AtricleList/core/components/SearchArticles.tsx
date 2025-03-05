import { colorChips } from "@/shared/styles/colorChips";
import { Input } from "@mui/material";
import { Stack } from "@mui/material";
import { FormControl } from "@mui/material";
import Image from "next/image";
import React, { useRef } from "react";

interface SearchArticlesProps {
  onSearch: (keyword: string) => void;
}

export const SearchArticles: React.FC<SearchArticlesProps> = ({ onSearch }) => {
  const searchPlaceholder = "검색할 게시글을 입력해주세요";
  const enterPressRef = useRef<boolean>(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (!enterPressRef.current) {
      const value = e.target.value.trim();
      onSearch(value);
    }
    enterPressRef.current = false; // blur이벤트 처리 후 enter상태 초기화
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const target = e.currentTarget;

    if (e.key === "Enter") {
      enterPressRef.current = true;
      target.blur();
      const value = target.value.trim();
      onSearch(value);
    }
  };

  return (
    <Stack sx={searchInputBoxStyle}>
      <FormControl variant="filled" sx={{ width: "100%", height: "42px" }}>
        <Input
          disableUnderline
          placeholder={searchPlaceholder}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          startAdornment={
            <Image
              src="/assets/search_icon.png"
              width={15}
              height={15}
              alt="search icon"
              style={{ marginRight: "10px", marginTop: 0 }}
            />
          }
          sx={searchInputStyle}
        />
      </FormControl>
    </Stack>
  );
};

const searchInputBoxStyle = {
  width: "100%",
  maxWidth: "1055px",
  height: "42px",
  padding: "9px 20px",
  backgroundColor: colorChips.gray100,
  borderRadius: "12px",
  border: "none",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
};

const searchInputStyle = {
  height: "42px",
  color: colorChips.gray600,
  fontFamily: "pretendard",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  padding: 0,
};
