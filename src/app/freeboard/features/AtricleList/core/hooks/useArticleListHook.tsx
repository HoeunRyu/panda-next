import { createArticleAPI } from "@/app/freeboard/core/service/articleService";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

import { useState } from "react";

export const useArticleList = () => {
  const [body, setBody] = useState({
    title: "",
    content: "",
  });
  const enterPressRef = useRef<boolean>(false);
  const router = useRouter();

  const updateBody = useCallback(
    (field: "title" | "content", value: string): void => {
      setBody((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  //input에 입력받은 내용 상위 컴포넌트에 전달하고 body 업데이트
  const handleBlur = (
    field: "title" | "content",
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!enterPressRef.current) {
      const value = e.target.value.trim();
      updateBody(field, value);
    }
    enterPressRef.current = false; // blur이벤트 처리 후 enter상태 초기화
  };

  const handleKeyDown = (
    field: "title" | "content",
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const target = e.currentTarget;

    if (e.key === "Enter") {
      enterPressRef.current = true;
      target.blur();
      const value = target.value.trim();
      updateBody(field, value);
    }
  };

  const isFormDisabled = useCallback((): boolean => {
    const { title, content } = body;

    const hasAllRequiredFields = Boolean(title && content);
    const isDisabled = !hasAllRequiredFields;

    return isDisabled;
  }, [body]);

  const usePostArticle = useCallback(async (): Promise<void> => {
    try {
      const { title, content } = body;
      const reqBody = { title, content };
      const response = await createArticleAPI(reqBody);
      const articleId = response.id;
      router.push(`/freeboard/${articleId}`);
    } catch (error) {
      //   console.error("게시글 등록하기 오류: ", error);
      throw new Error("게시글 등록 오류");
    }
  }, [body]);

  return {
    updateBody,
    handleBlur,
    handleKeyDown,
    isFormDisabled,
    usePostArticle,
  };
};
