import { CircularProgress, Stack } from "@mui/material";
import { useCommentList, CommentType } from "@/shared/hooks/useCommentHook";
import { CommentCard } from "./CommentCard";
import { ArticleCommentEmpty } from "@/app/freeboard/[articleId]/core/components/ArticleCommentEmpty";
import { useEffect, useRef, useCallback } from "react";
import { ProductInquiryEmpty } from "@/app/items/[itemId]/features/CommentList/core/components/ProductInquiryEmpty";

interface CommentListProps {
  type: CommentType;
  itemId: string;
}

export const CommentList = ({ type, itemId }: CommentListProps) => {
  const { comments, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCommentList(itemId, type);
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  return (
    <Stack sx={commentListSx}>
      {comments.length === 0 ? (
        type === "articles" ? (
          <ArticleCommentEmpty />
        ) : (
          <ProductInquiryEmpty />
        )
      ) : (
        <>
          {comments.map((comment) => (
            <CommentCard key={comment.id} data={comment} type={type} />
          ))}
          <div ref={observerRef} style={{ height: "10px" }} />
          {isFetchingNextPage && <CircularProgress size={20} />}
        </>
      )}
    </Stack>
  );
};

const commentListSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
};
