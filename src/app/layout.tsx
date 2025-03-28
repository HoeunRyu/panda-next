import type { Metadata } from "next";
import localFont from "next/font/local";
import "public/globals.css";
import { QueryProvider } from "@/shared/providers/QueryProvider";
// import { AuthInitializer } from "@/shared/hooks/useInitializeAuth";
import { SnackbarAlert } from "@/shared/components/Snackbar/SnackbarAlert";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/shared/theme";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "판다마켓",
  description: "일상의 모든 물건을 거래해보세요",
  icons: {
    icon: "/assets/logo_favicon.ico",
  },
  openGraph: {
    title: "판다마켓",
    description: "일상의 모든 물건을 거래해보세요",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={pretendard.className}>
        <ThemeProvider theme={theme}>
          <QueryProvider>
            {/* 로컬스토리지말고 쿠키로 변경해서 일단 사용x 유저정보 사용하는거 추가하면 주석해제 */}
            {/* <AuthInitializer /> */}
            {children}
            <SnackbarAlert />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
