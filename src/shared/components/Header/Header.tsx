"use client";

import { HeaderLogo } from "./ui/HeaderLogo";
import { HeaderLink } from "./ui/HeaderLink";
import { HeaderUser } from "./ui/HeaderUser";
import { useState } from "react";
import { Stack } from "@mui/material";

export function Header() {
  //TODO: 추후 유저데이터 관련 API 추가할 때 다시 수정. 지금은 임시로 버튼 클릭만 하면 로그인/로그아웃 전환되는 상태.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const handleClickUserBtn = (): void => setIsLoggedIn((prev) => !prev); //로그인 여부 토글

  return (
    <Stack sx={headerStyles}>
      <Stack sx={navStyles}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ gap: { xs: "16px", sm: "25px" } }}
        >
          <HeaderLogo />
          <HeaderLink />
        </Stack>

        <Stack>
          <HeaderUser
            isLoggedIn={isLoggedIn}
            handleClick={handleClickUserBtn}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

const headerStyles = {
  width: "100%",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #dfdfdf",
  height: "70px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 5,
  flexShrink: 0,
};

const navStyles = {
  width: "100%",
  maxWidth: "1440px",
  margin: "0 auto",
  padding: "0 24px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
