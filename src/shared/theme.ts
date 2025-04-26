"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "var(--font-pretendard)",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#3692ff",
    },
    secondary: {
      main: "#f74747",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 744,
      md: 1200,
      lg: 1500,
      xl: 1536,
    },
  },
});

export default theme;
