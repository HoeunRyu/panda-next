"use client";

import { CommonLayout } from "@/shared/layout/CommonLayout";
import { BestItems } from "./section/BestItems/BestItems";
import { OnSaleItems } from "./section/OnSaleItems/OnSaleItems";
import { Stack } from "@mui/material";

export default function Page() {
  return (
    <CommonLayout>
      <Stack sx={ItemsPageSx}>
        <BestItems />
        <OnSaleItems />
      </Stack>
    </CommonLayout>
  );
}

const ItemsPageSx = {
  width: "100%",
  maxWidth: "1240px",
  margin: "0 auto",
  paddingTop: "26px",
  paddingX: { xs: "16px", sm: "24px" },
  pb: "140px",
  gap: "40px",
};
