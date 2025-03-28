import { useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCodeitProductCommentListAPI,
  postCodeitProductCommentAPI,
  patchCodeitProductCommentAPI,
  deleteCodeitProductCommentAPI,
} from "../services/codeitProductCommentService";
import { codeitProductCommentKeys } from "@/shared/utils/queryKeys";
import { CodeitProductComment } from "@/shared/types/codeitApiType";

// 댓글 입력 및 등록
export const useCodeitProductCommentInput = (productId: string) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const enterPressRef = useRef<boolean>(false);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!enterPressRef.current) {
      const value = e.target.value.trim();
      handleContentChange(value);
    }
    enterPressRef.current = false;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter") {
      enterPressRef.current = true;
      e.currentTarget.blur();
      const value = e.currentTarget.value.trim();
      handleContentChange(value);
    }
  };

  const postComment = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      await postCodeitProductCommentAPI({
        productId,
        content: content.trim(),
      });
      setContent("");
      await queryClient.invalidateQueries({
        queryKey: codeitProductCommentKeys.list(productId),
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    isLoading,
    handleContentChange,
    handleBlur,
    handleKeyDown,
    postComment,
    isDisabled: !content.trim() || isLoading,
  };
};

// 댓글 목록 조회 훅 (무한 스크롤)
export const useCodeitProductCommentList = (productId: string) => {
  const queryKey = codeitProductCommentKeys.list(productId);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = null }: { pageParam: number | null }) =>
      getCodeitProductCommentListAPI({
        productId,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: null,
    staleTime: 0,
  });

  const comments =
    data?.pages.reduce<CodeitProductComment[]>((acc, page) => {
      if (page && Array.isArray(page.list)) {
        return [...acc, ...page.list];
      }
      return acc;
    }, []) ?? [];

  return {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
};

// 댓글 수정/삭제 훅
export const useCodeitProductCommentActions = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const updateComment = async (commentId: number, content: string) => {
    setIsLoading(true);
    try {
      await patchCodeitProductCommentAPI({
        commentId,
        content,
      });
      await queryClient.invalidateQueries({
        queryKey: codeitProductCommentKeys.all,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    setIsLoading(true);
    try {
      await deleteCodeitProductCommentAPI({
        commentId,
      });
      await queryClient.invalidateQueries({
        queryKey: codeitProductCommentKeys.all,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    updateComment,
    deleteComment,
  };
};
