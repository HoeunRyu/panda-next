import { CircularProgress, Stack } from "@mui/material";
import { CommentCard } from "./core/components/CommentCard";
import { useEffect, useRef, useCallback } from "react";
import { ProductInquiryEmpty } from "./core/components/ProductInquiryEmpty";
import { useCodeitProductCommentList } from "../../core/hooks/useCodeitProductCommentQuery";

interface CommentListProps {
  itemId: string;
}

// XXX: 코드잇 api에서 미션 api로 마이그레이션 하면서 사용안하게됨
export const CommentList = ({ itemId }: CommentListProps) => {
  const { comments, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCodeitProductCommentList(itemId);
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
        <ProductInquiryEmpty />
      ) : (
        <>
          {comments.map((comment) => (
            <CommentCard key={comment.id} data={comment} />
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
