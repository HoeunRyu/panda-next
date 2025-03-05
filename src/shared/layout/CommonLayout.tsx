import { Header } from "@/shared/components/Header/Header";
import { Footer } from "@/shared/components/Footer/Footer";
import { Stack, Box } from "@mui/material";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh", // 전체 뷰포트 높이를 최소 높이로 설정
  },
  main: {
    flex: 1, // 남은 공간을 모두 차지하도록 설정
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  content: {
    width: "100%",
    overflowX: "auto",
    margin: "0 auto",
  },
};

export function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={styles.wrapper}>
      <Header />
      <Stack sx={styles.main}>
        <Box sx={styles.content}>{children}</Box>
      </Stack>
      <Footer />
    </Box>
  );
}
