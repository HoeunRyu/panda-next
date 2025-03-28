import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import { articleKeys } from "@/shared/utils/queryKeys";
import { createArticleAPI } from "../service/articleService";

interface UsePostArticleState {
  title: string;
  content: string;
  image?: File;
  imageUrl?: string;
}

export const usePostArticleHook = () => {
  const [body, setBody] = useState<UsePostArticleState>({
    title: "",
    content: "",
    image: undefined,
    imageUrl: undefined,
  });
  const [showMaxImageError, setShowMaxImageError] = useState(false);
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const queryClient = useQueryClient();

  const handleBlur = useCallback(
    (
      field: "title" | "content",
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setBody((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    []
  );

  const handleKeyDown = useCallback(
    (
      field: "title" | "content",
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    },
    []
  );

  const handleImageInput = useCallback(() => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || !files[0]) return;

      // 파일 크기 체크 (5MB)
      if (files[0].size > 5 * 1024 * 1024) {
        openSnackbar("이미지 크기는 5MB 이하여야 합니다.", "error");
        return;
      }

      // 이미지 URL 생성 및 상태 업데이트
      const imageUrl = URL.createObjectURL(files[0]);

      setBody((prev) => ({
        ...prev,
        image: files[0],
        imageUrl,
      }));
    };

    // 이미지가 이미 있을 때
    if (body.image) {
      setShowMaxImageError(true);
      setTimeout(() => setShowMaxImageError(false), 3000);
      return;
    }

    fileInput.click();
  }, [body.image, openSnackbar]);

  const handleDeleteImage = useCallback(() => {
    setBody((prev) => {
      if (prev.imageUrl) {
        URL.revokeObjectURL(prev.imageUrl);
      }
      return {
        ...prev,
        image: undefined,
        imageUrl: undefined,
      };
    });
  }, []);

  const usePostArticle = useCallback(async () => {
    try {
      const { title, content, image } = body;
      const reqBody = {
        title,
        content,
        image,
      };

      const response = await createArticleAPI(reqBody);
      const articleId = response.id;

      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      router.push(`/freeboard/${articleId}`);
    } catch (error: any) {
      if (error?.response?.data?.message === "로그인 후 이용해주세요.") {
        openSnackbar("로그인 후 이용해주세요.", "error");
        router.push("/login");
      } else {
        openSnackbar("다시 시도해주세요.", "error");
      }
      throw error;
    }
  }, [body, queryClient, router, openSnackbar]);

  const isFormDisabled = useCallback((): boolean => {
    const { title, content } = body;
    return !title || !content;
  }, [body]);

  return {
    body,
    handleBlur,
    handleKeyDown,
    usePostArticle,
    isFormDisabled,
    showMaxImageError,
    handleImageInput,
    handleDeleteImage,
  };
};
