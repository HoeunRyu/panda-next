import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getArticleDetailAPI,
  patchArticleAPI,
  deleteArticleAPI,
  PatchArticleApiProps,
  DeleteArticleApiProps,
} from "../service/articleDetailService";
import { Article, DeleteCommentResponse } from "@/shared/type";
import { articleKeys } from "@/shared/utils/queryKeys";

export const useGetArticleDetail = (articleId: string) => {
  const { data, isLoading } = useQuery<Article>({
    queryKey: articleKeys.detail(articleId),
    queryFn: () => getArticleDetailAPI({ articleId }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, isLoading };
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<Article, Error, PatchArticleApiProps>({
    mutationFn: (params: PatchArticleApiProps) => patchArticleAPI(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: articleKeys.all,
      });
    },
    onError: (error: any) => {
      throw error;
    },
  });
};
