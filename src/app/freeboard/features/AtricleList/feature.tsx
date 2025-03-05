import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { CircularProgress, Stack } from "@mui/material";
import { ArticlePostBtn } from "./core/components/ArticlePostBtn";
import { SearchArticles } from "./core/components/SearchArticles";
import { useSearchStore } from "../../core/hooks/useSearchStore";
import { SortArticles } from "./core/components/SortArticles";
import { useArticleList } from "../../core/hooks/useArticleListQuery";
import { ArticleCard } from "./core/components/ArticleCard";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AtricleList = () => {
  const { updateParams } = useSearchStore();
  const router = useRouter();

  const handleClickArticle = (articleId: string) => {
    router.push(`/freeboard/${articleId}`);
  };

  const handleUpdateParams = (field: "keyword" | "sort", value: string) => {
    updateParams(field, value);
  };

  const {
    articles,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useArticleList();

  const isShowSkeleton =
    isLoading || (isFetching && !isFetchingNextPage && articles.length === 0);

  // 로딩 완료 시에 데이터 없는 경우
  const hasNoResults = !isLoading && !isFetching && articles.length === 0;

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px 0px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <Stack sx={articleListContainerStyle}>
      <Stack sx={articleListHeaderStyle}>
        <Typo
          className="text20Bold"
          content="게시글"
          color={colorChips.gray900}
        />
        <Link href="/freeboard/post">
          <ArticlePostBtn />
        </Link>
      </Stack>
      <Stack sx={articleListHeaderStyle}>
        <SearchArticles
          onSearch={(keyword) => handleUpdateParams("keyword", keyword)}
        />
        <SortArticles
          onSortChange={(sort) => handleUpdateParams("sort", sort)}
        />
      </Stack>
      <Stack sx={articleListItemWrapperStyle}>
        {isShowSkeleton ? (
          <Stack
            sx={{
              width: "100%",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={30} />
          </Stack>
        ) : hasNoResults ? (
          <Stack
            sx={{
              width: "100%",
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typo
              className="text16Regular"
              content="게시글이 없습니다."
              color={colorChips.gray800}
              customStyle={{ padding: "0 8px" }}
            />
          </Stack>
        ) : (
          <Stack sx={{ flexDirection: "column", width: "100%" }}>
            {articles.map((article, idx) => {
              const isLastItem = idx === articles.length - 1;
              return (
                <Stack
                  key={article.id}
                  sx={{ flexDirection: "column" }}
                  onClick={() => handleClickArticle(article.id.toString())}
                >
                  <ArticleCard article={article} />
                  {!isLastItem && (
                    <>
                      <Stack
                        sx={{
                          ...hrLineStyle,
                          borderBottom: `1px solid ${colorChips.gray200}`,
                        }}
                      />
                      <Stack sx={hrLineStyle} />
                    </>
                  )}
                </Stack>
              );
            })}
            {hasNextPage && (
              <>
                <div ref={ref} style={{ height: "20px", marginTop: "20px" }} />
                <Stack
                  sx={{
                    width: "100%",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress size={30} />
                </Stack>
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

const articleListContainerStyle = {
  width: "100%",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: { xs: "16px", sm: "24px" },
};

const articleListHeaderStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  flexShrink: 0,
};

const articleListItemWrapperStyle = {
  width: "100%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "24px",
};

export const hrLineStyle = {
  width: "100%",
  height: "24px",
};
