import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getArticleDetailAPI,
  patchArticleAPI,
  deleteArticleAPI,
  PatchArticleApiProps,
  DeleteArticleApiProps,
} from "../service/articleDetailService";
import { Article } from "@/shared/type";
import { articleKeys } from "@/shared/utils/queryKeys";

export const useGetArticleDetail = (articleId: string) => {
  if (typeof articleId === "string") {
    const { data, isLoading } = useQuery<Article>({
      queryKey: articleKeys.detail(articleId),
      queryFn: () => getArticleDetailAPI({ articleId: articleId }),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

    return {
      data: {
        id: data?.id ?? "",
        title: data?.title ?? "",
        content: data?.content ?? "",
        image: data?.image ?? "",
        favoritesCount: data?.favoritesCount ?? 0,
        createdAt: data?.createdAt ?? "",
        updatedAt: data?.updatedAt ?? "",
      },
      isLoading,
    };
  }

  return {
    data: null,
    isLoading: false,
  };
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<Article, Error, PatchArticleApiProps>({
    mutationFn: (params: PatchArticleApiProps) => patchArticleAPI(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: articleKeys.detail(variables.articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleKeys.all,
      });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteArticleApiProps>({
    mutationFn: (params: DeleteArticleApiProps) => deleteArticleAPI(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: articleKeys.detail(variables.articleId),
      });
      queryClient.invalidateQueries({
        queryKey: articleKeys.all,
      });
    },
  });
};
