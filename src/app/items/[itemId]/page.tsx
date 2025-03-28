"use client";

import { Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { CommonLayout } from "@/shared/layout/CommonLayout";
import { Features } from "./features";
import { ReturnToListBtn } from "@/shared/components/CommentList/ReturnToListBtn";
import { CommentInput } from "@/shared/components/CommentInput/CommentInput";
import { CommentList } from "@/shared/components/CommentList/CommentList";

export default function Page() {
  const params = useParams();
  const itemId = Array.isArray(params.itemId)
    ? params.itemId[0]
    : params.itemId;

  if (!itemId) {
    return null;
  }

  const commentInputLabel = "문의하기";
  const commentInputPlaceholder =
    "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  const returnUrl = "/items";

  return (
    <CommonLayout>
      <Stack sx={itemDetailContainerStyle}>
        <Features.ProductDetails itemId={itemId} />
        <Stack sx={itemCommentsContainerStyle}>
          {/* <Features.CommentInput itemId={itemId} />
          <Features.CommentList itemId={itemId} /> */}
          <CommentInput
            itemId={itemId}
            type="products"
            inputLabel={commentInputLabel}
            placeholder={commentInputPlaceholder}
          />
          <CommentList itemId={itemId} type="products" />
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
