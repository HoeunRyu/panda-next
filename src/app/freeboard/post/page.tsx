"use client";

import { Button, FormControl, Input, InputBase, Stack } from "@mui/material";
import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { CommonLayout } from "@/shared/layout/CommonLayout";
import { usePostArticleHook } from "../core/hooks/usePostArticleHook";
import { ArticleImgInput } from "../core/components/ArticleImgInput";

export default function Page() {
  const titlePlaceholder = "제목을 입력해주세요";
  const contentPlaceholder = "내용을 입력해주세요";

  const {
    handleBlur,
    handleKeyDown,
    isFormDisabled,
    usePostArticle,
    body,
    handleImageInput,
    handleDeleteImage,
    showMaxImageError,
  } = usePostArticleHook();

  return (
    <CommonLayout>
      <Stack sx={postArticleContainerStyle}>
        <Stack sx={postArticleHeaderStyle}>
          <Typo
            content="게시글 쓰기"
            className="text20Bold"
            color={colorChips.gray800}
          />
          <Button
            variant="contained"
            sx={articlePostBtnStyle}
            disabled={isFormDisabled()}
            onClick={usePostArticle}
          >
            등록
          </Button>
        </Stack>

        <Stack sx={postArticleFormStyle}>
          <Stack sx={postArticleFormItemStyle}>
            <Typo
              content="*제목"
              className="text18Bold"
              color={colorChips.gray800}
            />
            <FormControl variant="filled" sx={titleInputBoxStyle}>
              <Input
                disableUnderline
                placeholder={titlePlaceholder}
                onBlur={(e) => handleBlur("title", e)}
                onKeyDown={(e) => handleKeyDown("title", e)}
                sx={placeholderStyle}
              />
            </FormControl>
          </Stack>
          <Stack sx={postArticleFormItemStyle}>
            <Typo
              content="*내용"
              className="text18Bold"
              color={colorChips.gray800}
            />
            <FormControl variant="filled" sx={contentInputBoxStyle}>
              <InputBase
                fullWidth
                multiline
                minRows={3}
                maxRows={10}
                onBlur={(e) => handleBlur("content", e)}
                onKeyDown={(e) => handleKeyDown("content", e)}
                placeholder={contentPlaceholder}
                sx={placeholderStyle}
              />
            </FormControl>
          </Stack>
          <ArticleImgInput
            onClickFileInput={handleImageInput}
            imageUrl={body.imageUrl}
            onClickDeleteImg={handleDeleteImage}
            showMaxImageError={showMaxImageError}
          />
        </Stack>
      </Stack>
    </CommonLayout>
  );
}

const postArticleContainerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingX: { xs: "16px", sm: "24px" },
  pt: { xs: "16px", md: "40px" },
  pb: "100px",
  gap: { xs: "24px", sm: "32px" },
};

const postArticleHeaderStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
} as const;

const articlePostBtnStyle = {
  width: "fit-content",
  height: "42px",
  padding: "12px 23px",
  borderRadius: "8px",
  backgroundColor: colorChips.primary100,
  fontFamily: "Pretendard",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "26px",
  color: colorChips.gray100,
} as const;

const postArticleFormStyle = {
  width: "100%",
  flexDirection: "column",
  gap: { xs: "16px", md: "24px" },
} as const;

const postArticleFormItemStyle = {
  width: "100%",
  flexDirection: "column",
  gap: "12px",
} as const;

const titleInputBoxStyle = {
  width: "100%",
  height: "56px",
  padding: "16px 24px",
  backgroundColor: colorChips.gray100,
  borderRadius: "12px",
  border: "none",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
};

const contentInputBoxStyle = {
  width: "100%",
  height: "fit-content",
  minHeight: "282px",
  padding: "16px 24px",
  backgroundColor: colorChips.gray100,
  borderRadius: "12px",
  border: "none",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  "& .MuiInputBase-input": {
    padding: 0,
    margin: 0,
  },
};

const placeholderStyle = {
  color: colorChips.gray600,
  fontFamily: "Pretendard",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "26px",
  flex: 1,
  wordBreak: "break-word",
  "& .MuiInputBase-input": {
    padding: "10px 0",
    overflowY: "auto",
  },
  border: "none",
  padding: 0,
  margin: 0,
};
