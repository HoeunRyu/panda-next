"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import { colorChips } from "@/shared/styles/colorChips";

export function HeaderLink() {
  //현재 페이지 주소에 따라 메뉴 활성화 상태 색상으로 표시
  const pathname: string = usePathname(); // useLocation 대신 usePathname 사용

  const getLinkColor = (path: string) =>
    pathname === path ? colorChips.primary100 : colorChips.gray600;

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ flexShrink: 0 }}
    >
      <Link href="/freeboard" style={{ textDecoration: "none" }}>
        <Typo
          className="text18Bold"
          content="자유게시판"
          sx={{ ...linkItemStyles, color: getLinkColor("/freeboard") }}
        />
      </Link>
      <Link href="/items" style={{ textDecoration: "none" }}>
        <Typo
          className="text12Medium"
          content="중고마켓"
          sx={{
            ...linkItemStyles,
            color: getLinkColor("/items"),
          }}
        />
      </Link>
    </Stack>
  );
}

const linkItemStyles = {
  padding: { xs: "20px 4px", sm: "21px 15px" },
  textAlign: "center",
  fontFamily: "Pretendard",
  fontSize: { xs: "16px", sm: "18px" },
  fontWeight: 700,
  lineHeight: "150%",
  whiteSpace: "nowrap",
};
