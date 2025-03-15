import { ArticleList } from "@/shared/type";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useMemo, useCallback } from "react";
import { getArticleListAPI } from "../service/articleService";
import { useSearchStore } from "./useSearchStore";
import { articleKeys } from "@/shared/utils/queryKeys";

export const useBestArticles = (limit: number) => {
  const sort = "favorite";

  const { data, isLoading } = useQuery<ArticleList>({
    queryKey: articleKeys.best(limit),
    queryFn: () => getArticleListAPI({ sort, limit }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    articles: data?.ArticleList ?? [],
    isLoading,
  };
};

export const useArticleList = () => {
  const { params } = useSearchStore();
  const { keyword = "", page = 1, sort = "recent" } = params;

  const LIMIT = 10;
  const MIN_LOADING_TIME = 500;

  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: articleKeys.list({ keyword, page, sort }),
    queryFn: async ({ pageParam = 1 }) => {
      const startTime = Date.now();
      const response = await getArticleListAPI({
        keyword,
        sort,
        page: pageParam,
        limit: LIMIT,
      });

      // 최소 로딩 시간 보장
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsedTime)
        );
      }

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const articles = useMemo(() => {
    const allArticles = data?.pages.flatMap((page) => page.ArticleList) ?? [];
    // 중복 제거
    return Array.from(
      new Map(allArticles.map((article) => [article.id, article])).values()
    );
  }, [data]);

  // params가 변경될 때만 수동으로 invalidate하는 함수
  const invalidateArticleList = useCallback(() => {
    const currentQueryKey = articleKeys.list({ keyword, page, sort });
    queryClient.invalidateQueries({ queryKey: currentQueryKey });
  }, [queryClient, keyword, page, sort]);

  useEffect(() => {
    invalidateArticleList();
  }, [params]);

  return {
    articles,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    invalidateArticleList,
  };
};
