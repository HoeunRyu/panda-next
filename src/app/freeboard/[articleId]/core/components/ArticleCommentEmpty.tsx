import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import Image from "next/image";

export const ArticleCommentEmpty = () => {
  return (
    <Stack sx={commentEmptySx}>
      <Image
        src="/assets/reply_empty_img.svg"
        alt="comment-empty"
        width={100}
        height={100}
      />
      <Typo
        className="text16Regular"
        content="아직 댓글이 없어요,"
        color={colorChips.gray400}
      />
      <Typo
        className="text16Regular"
        content="지금 댓글을 달아보세요!"
        color={colorChips.gray400}
      />
    </Stack>
  );
};

const commentEmptySx = {
  width: "100%",
  height: "200px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
