"use client";

import { CommonLayout } from "@/shared/layout/CommonLayout";
import { Features } from "./features";
import { Stack } from "@mui/material";

export default function Page() {
  return (
    <CommonLayout>
      <Stack sx={freeboardStyle}>
        <Features.BestArticles />
        <Features.AtricleList />
      </Stack>
    </CommonLayout>
  );
}

const freeboardStyle = {
  padding: { xs: "16px 16px 90px 16px", sm: "24px 24px 120px 24px" },
  width: "100%",
  maxWidth: "1200px",
  height: "100%",
  margin: "0 auto",
  gap: { xs: "24px", md: "40px" },
};
