import { Typo } from "@/shared/Typo/Typo";
import { Button } from "@mui/material";
import { colorChips } from "@/shared/styles/colorChips";

export const ArticlePostBtn = () => {
  return (
    <Button sx={articlePostBtnStyle}>
      <Typo
        className="text16Semibold"
        content="글쓰기"
        color={colorChips.white}
        customStyle={{ whiteSpace: "nowrap" }}
      />
    </Button>
  );
};

const articlePostBtnStyle = {
  width: "fit-content",
  height: "42px",
  padding: "12px 23px",
  borderRadius: "8px",
  backgroundColor: colorChips.primary100,
} as const;
