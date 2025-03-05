"use client";

import { Stack } from "@mui/material";
import { useParams } from "next/navigation";
import { CommonLayout } from "@/shared/layout/CommonLayout";
import { Features } from "./feature";
import { CommentInput } from "@/shared/components/CommentInput/CommentInput";
import { CommentList } from "@/shared/components/CommentList/CommentList";
import { ReturnToListBtn } from "@/shared/components/CommentList/ReturnToListBtn";

export default function Page() {
  const params = useParams();
  const articleId = Array.isArray(params.articleId)
    ? params.articleId[0]
    : params.articleId;

  //FIXME: 게시글 ID가 없는 경우 404나 알림 띄우는거 추가하면 좋을 듯
  if (!articleId) {
    return null;
  }
  const commentInputLabel = "댓글 달기";
  const commentInputPlaceholder = "댓글을 입력해주세요.";

  const returnUrl = "/freeboard";

  return (
    <CommonLayout>
      <Stack sx={articleDetailContainerStyle}>
        <Features.ArticleDetails articleId={articleId} />
        <Stack sx={articleCommentsContainerStyle}>
          <CommentInput
            itemId={articleId}
            type="articles"
            inputLabel={commentInputLabel}
            placeholder={commentInputPlaceholder}
          />
          <CommentList itemId={articleId} type="articles" />
          <ReturnToListBtn returnUrl={returnUrl} />
        </Stack>
      </Stack>
    </CommonLayout>
  );
}

const articleDetailContainerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingX: { xs: "16px", sm: "24px" },
  pt: { xs: "24px", sm: "26px", md: "34px" },
  pb: "100px",
  gap: "32px",
};

const articleCommentsContainerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
