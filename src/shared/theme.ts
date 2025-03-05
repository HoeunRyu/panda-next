"use client";

// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-pretendard)",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#3692ff", // 원하는 색상 코드로 변경하세요.
    },
    secondary: {
      main: "#f74747",
    },
  },
  // typography: {
  //   fontFamily: 'Pretendard Variable', // 원하는 폰트로 변경하세요.
  // },
  // 추가로 커스터마이징이 필요하면 여기에 작성하세요.
  breakpoints: {
    // custom breakpoints: https://mui.com/material-ui/customization/breakpoints/#custom-breakpoints
    // 일단 기본값으로 덮어썼는데, 추후 커스텀 필요하면 수정하기
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
