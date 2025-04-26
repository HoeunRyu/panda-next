import { useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCommentAPI,
  postCommentAPI,
  patchCommentAPI,
  deleteCommentAPI,
} from "@/shared/service/commentsService";
import { Comment, CommentList } from "@/shared/type";
import { commentKeys } from "../utils/queryKeys";
import { useSnackbarStore } from "../store/useSnackbarStore";
import { useRouter } from "next/navigation";
export type CommentType = "articles" | "products";

// 댓글 입력 및 등록
export const useCommentInput = (itemId: string, type: CommentType) => {
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
      await postCommentAPI({
        itemId,
        type,
        params: { content: content.trim() },
      });
      setContent(""); // 입력 초기화
      // 댓글 목록 갱신
      await queryClient.invalidateQueries({
        queryKey: commentKeys.list(itemId, type),
      });
    } catch (error) {
      // console.error("댓글 등록 실패:", error);
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
export const useCommentList = (itemId: string, type: CommentType) => {
  const queryKey = commentKeys.list(itemId, type);

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
    queryFn: ({ pageParam = null }: { pageParam: string | null }) =>
      getCommentAPI({ itemId, type, lastCursor: pageParam }),
    getNextPageParam: (lastPage) => {
      // console.log("Last Page Data:", lastPage);
      return lastPage?.lastCursor ?? undefined;
    },
    initialPageParam: null,
    staleTime: 0,
  });

  // console.log("Query Data:", data);

  const comments =
    data?.pages?.reduce<Comment[]>((acc: Comment[], page: CommentList) => {
      if (page && Array.isArray(page.commentsList)) {
        return [...acc, ...page.commentsList];
      }
      return acc;
    }, []) ?? [];

  return {
    comments,
    // data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
};

// 댓글 수정/삭제 훅
export const useCommentActions = (type: CommentType) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const [isLoading, setIsLoading] = useState(false);

  const updateComment = async (id: string, content: string) => {
    setIsLoading(true);
    try {
      await patchCommentAPI({
        id,
        type,
        params: { content },
      });
      // 댓글 수정 후 목록 갱신
      await queryClient.invalidateQueries({
        queryKey: commentKeys.all,
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "댓글 수정에 실패했습니다.";
      openSnackbar(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteCommentAPI({
        id,
        type,
      });
      // 댓글 삭제 후 목록 갱신
      await queryClient.invalidateQueries({
        queryKey: commentKeys.all,
      });
    } catch (error: any) {
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
