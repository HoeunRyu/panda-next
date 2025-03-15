import { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postCodeitProductFavoriteAPI,
  deleteCodeitProductFavoriteAPI,
} from "../services/productFavoriteService";
import { codeitItemKeys } from "@/shared/utils/queryKeys";
import { handleApiError } from "@/shared/service/codeit/handleApiError";

interface UseProductFavoriteProps {
  productId: string;
  initialFavorite: boolean;
}

export const useProductFavoriteHook = ({
  productId,
  initialFavorite,
}: UseProductFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const updateFavoriteCache = (newFavoriteStatus: boolean) => {
    queryClient.setQueryData(codeitItemKeys.detail(productId), (old: any) => {
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
    mutationFn: (productId: string) =>
      postCodeitProductFavoriteAPI({ productId }),
    onSuccess: () => {
      updateFavoriteCache(true);
      setIsFavorite(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: codeitItemKeys.all });
    },
  });

  const deleteFavoriteMutation = useMutation({
    mutationFn: (productId: string) =>
      deleteCodeitProductFavoriteAPI({ productId }),
    onSuccess: () => {
      updateFavoriteCache(false);
      setIsFavorite(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: codeitItemKeys.all });
    },
  });

  const handleToggleFavorite = useCallback(async () => {
    try {
      if (isFavorite) {
        await deleteFavoriteMutation.mutateAsync(productId);
      } else {
        await saveFavoriteMutation.mutateAsync(productId);
      }
    } catch (err) {
      handleApiError(err);
    }
  }, [isFavorite, productId, deleteFavoriteMutation, saveFavoriteMutation]);

  return {
    isFavorite,
    handleToggleFavorite,
  };
};
