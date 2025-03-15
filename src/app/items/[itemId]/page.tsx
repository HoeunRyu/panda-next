"use client";

import { Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { CommonLayout } from "@/shared/layout/CommonLayout";
import { Features } from "./features";
import { ReturnToListBtn } from "@/shared/components/CommentList/ReturnToListBtn";

export default function Page() {
  const params = useParams();
  const itemId = Array.isArray(params.itemId)
    ? params.itemId[0]
    : params.itemId;

  //FIXME: 게시글 ID가 없는 경우 404나 알림 띄우는거 추가하면 좋을 듯
  if (!itemId) {
    return null;
  }

  const returnUrl = "/items";

  return (
    <CommonLayout>
      <Stack sx={itemDetailContainerStyle}>
        <Features.ProductDetails itemId={itemId} />
        <Stack sx={itemCommentsContainerStyle}>
          <Features.CommentInput itemId={itemId} />
          <Features.CommentList itemId={itemId} />
          <ReturnToListBtn returnUrl={returnUrl} />
        </Stack>
      </Stack>
    </CommonLayout>
  );
}

const itemDetailContainerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingX: { xs: "16px", sm: "24px" },
  pt: { xs: "24px", sm: "26px", md: "34px" },
  pb: "160px",
  gap: "40px",
};

const itemCommentsContainerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
