"use client";

import {
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputBase,
  Stack,
} from "@mui/material";
import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { CommonLayout } from "@/shared/layout/CommonLayout";
import { useParams, useRouter } from "next/navigation";
import {
  useGetArticleDetail,
  useUpdateArticle,
} from "../core/hooks/useArticleDetailQuery";
import { useState, useEffect } from "react";
import { ArticleImgInput } from "../../core/components/ArticleImgInput";

export default function Page() {
  const router = useRouter();
  const { articleId } = useParams();
  const id = Array.isArray(articleId) ? articleId[0] : articleId;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: undefined as File | undefined,
    imageUrl: undefined as string | undefined,
  });

  const [showMaxImageError, setShowMaxImageError] = useState(false);

  // id가 없으면 early return
  if (!id) {
    router.push("/freeboard");
    return null;
  }

  // 기존 게시글 데이터 조회
  const { data: articleData, isLoading } = useGetArticleDetail(id);
  const { mutate: updateArticle } = useUpdateArticle();

  // 기존 데이터로 폼 초기화
  useEffect(() => {
    if (articleData && articleData.title && articleData.content) {
      setFormData({
        title: articleData.title,
        content: articleData.content,
        image: undefined,
        imageUrl: articleData.image || undefined,
      });
    }
  }, [articleData]);

  const titlePlaceholder = "제목을 입력해주세요";
  const contentPlaceholder = "내용을 입력해주세요";

  const handleBlur = (
    field: "title" | "content",
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value.trim();
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleKeyDown = (
    field: "title" | "content",
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && field === "title") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const isFormDisabled = () => {
    return !formData.title.trim() || !formData.content.trim();
  };

  const handleImageInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || !files[0]) return;

      if (files[0].size > 5 * 1024 * 1024) {
        window.alert("이미지 크기는 5MB 이하여야 합니다.");
        return;
      }

      const imageUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        imageUrl,
      }));
    };

    if (formData.image) {
      setShowMaxImageError(true);
      setTimeout(() => setShowMaxImageError(false), 3000);
      return;
    }

    fileInput.click();
  };

  const handleDeleteImage = () => {
    setFormData((prev) => {
      if (prev.imageUrl && prev.image) {
        URL.revokeObjectURL(prev.imageUrl);
      }
      return {
        ...prev,
        image: undefined,
        imageUrl: undefined,
      };
    });
  };

  const handleClickUpdateArticle = () => {
    if (isFormDisabled()) return;

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title.trim());
    formDataObj.append("content", formData.content.trim());
    if (formData.image) {
      formDataObj.append("images", formData.image);
    }

    updateArticle(
      {
        articleId: id,
        title: formData.title.trim(),
        content: formData.content.trim(),
        image: formData.image,
      },
      {
        onSuccess: () => {
          router.push(`/freeboard/${id}`);
        },
        onError: (error) => {
          window.alert("게시글 수정에 실패했습니다.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={40} />
      </Stack>
    );
  }

  return (
    <CommonLayout>
      <Stack sx={postArticleContainerStyle}>
        <Stack sx={postArticleHeaderStyle}>
          <Typo
            content="게시글 수정하기"
            className="text20Bold"
            color={colorChips.gray800}
          />
          <Button
            variant="contained"
            sx={articlePostBtnStyle}
            disabled={isFormDisabled()}
            onClick={handleClickUpdateArticle}
          >
            수정
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
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
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
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                onBlur={(e) => handleBlur("content", e)}
                placeholder={contentPlaceholder}
                sx={placeholderStyle}
              />
            </FormControl>
          </Stack>
          <ArticleImgInput
            onClickFileInput={handleImageInput}
            imageUrl={formData.imageUrl}
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
};

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
