import { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postArticleLikeAPI,
  deleteArticleLikeAPI,
} from "../service/articleFavoriteService";
import { handleApiError } from "@/shared/service/handleApiError";
import { articleKeys } from "@/shared/utils/queryKeys";

interface UseArticleFavoriteProps {
  articleId: string;
  initialFavorite: boolean;
}

export const useArticleFavoriteHook = ({
  articleId,
  initialFavorite,
}: UseArticleFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const updateFavoriteCache = (newFavoriteStatus: boolean) => {
    queryClient.setQueryData(articleKeys.detail(articleId), (old: any) => {
      if (!old) return old;
      return {
        ...old,
        isFavorite: newFavoriteStatus,
        favoriteCount: newFavoriteStatus
          ? old.favoriteCount + 1
          : old.favoriteCount - 1,
      };
    });
  };

  const saveFavoriteMutation = useMutation({
    mutationFn: (articleId: string) => postArticleLikeAPI({ articleId }),
    onSuccess: () => {
      updateFavoriteCache(true);
      setIsFavorite(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.all });
    },
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: (articleId: string) => deleteArticleLikeAPI({ articleId }),
    onSuccess: () => {
      updateFavoriteCache(false);
      setIsFavorite(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.all });
    },
  });

  const handleToggleFavorite = useCallback(async () => {
    try {
      if (isFavorite) {
        await deleteFavoriteMutation.mutateAsync(articleId);
      } else {
        await saveFavoriteMutation.mutateAsync(articleId);
      }
    } catch (err) {
      handleApiError(err);
    }
  }, [isFavorite, articleId, deleteFavoriteMutation, saveFavoriteMutation]);

  return {
    isFavorite,
    handleToggleFavorite,
  };
};
