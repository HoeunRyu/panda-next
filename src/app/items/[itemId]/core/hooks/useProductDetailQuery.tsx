import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getCodeitProductDetailAPI,
  patchCodeitProductAPI,
  deleteCodeitProductAPI,
  PatchCodeitProductApiProps,
} from "../services/productDetailService";
import { articleKeys, codeitItemKeys } from "@/shared/utils/queryKeys";
import { DeleteProductApiProps } from "../services/productDetailService";
import {
  CodeitProduct,
  CodeitProductDetail,
} from "@/shared/types/codeitApiType";

export const useGetCodeitProductDetail = (productId: string) => {
  if (typeof productId === "string") {
    const { data, isLoading } = useQuery<CodeitProductDetail>({
      queryKey: codeitItemKeys.detail(productId),
      queryFn: () => getCodeitProductDetailAPI({ productId: productId }),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

    return {
      data: {
        id: data?.id ?? "",
        isFavorite: data?.isFavorite ?? false,
        name: data?.name ?? "",
        description: data?.description ?? "",
        price: data?.price ?? 0,
        images: data?.images ?? [],
        tags: data?.tags ?? [],
        ownerId: data?.ownerId ?? 0,
        ownerNickname: data?.ownerNickname ?? "",
        favoriteCount: data?.favoriteCount ?? 0,
        createdAt: data?.createdAt ?? "",
      },
      isLoading,
    };
  }

  return {
    data: null,
    isLoading: false,
  };
};

export const useUpdateCodeitProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<CodeitProduct, Error, PatchCodeitProductApiProps>({
    mutationFn: (params: PatchCodeitProductApiProps) =>
      patchCodeitProductAPI(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: codeitItemKeys.detail(variables.productId),
      });
      queryClient.invalidateQueries({
        queryKey: articleKeys.all,
      });
    },
  });
};

export const useDeleteCodeitProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteProductApiProps>({
    mutationFn: (params: DeleteProductApiProps) =>
      deleteCodeitProductAPI(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: codeitItemKeys.detail(variables.productId),
      });
      queryClient.invalidateQueries({
        queryKey: codeitItemKeys.all,
      });
    },
    onError: (error: any) => {
      throw error;
    },
  });
};
