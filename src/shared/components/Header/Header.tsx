"use client";

import { HeaderLogo } from "./ui/HeaderLogo";
import { HeaderLink } from "./ui/HeaderLink";
import { HeaderUser } from "./ui/HeaderUser";
import { Stack } from "@mui/material";

export function Header() {
  return (
    <Stack sx={headerStyles}>
      <Stack sx={navStyles}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ gap: { xs: "8px", sm: "20px", md: "25px" } }}
        >
          <HeaderLogo />
          <HeaderLink />
        </Stack>

        <Stack>
          <HeaderUser />
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
