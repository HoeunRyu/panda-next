import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  // getCodeitProductDetailAPI,
  // patchCodeitProductAPI,
  // deleteCodeitProductAPI,
  // PatchCodeitProductApiProps,
  getProductDetailAPI,
  patchProductAPI,
  deleteProductAPI,
} from "../services/productDetailService";
import { productKeys } from "@/shared/utils/queryKeys";
import { DeleteProductApiProps } from "../services/productDetailService";
import // CodeitProduct,
// CodeitProductDetail,
"@/shared/types/codeitApiType";
import {
  DeleteProductResponse,
  PatchProdApiQueryParams,
  Product,
} from "@/shared/type";

export const useGetProductDetail = (productId: string) => {
  if (typeof productId === "string") {
    const { data, isLoading } = useQuery<Product>({
      queryKey: productKeys.detail(productId),
      queryFn: () => getProductDetailAPI({ productId: productId }),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

    return {
      data: {
        id: data?.id ?? "",
        name: data?.name ?? "",
        description: data?.description ?? "",
        price: data?.price ?? 0,
        images: data?.images ?? [],
        tags: data?.ProductTag ?? [],
        ownerId: data?.ownerId ?? 0,
        ownerNickname: data?.ownerNickname ?? "",
        isLiked: data?.isLiked ?? false,
        likeCount: data?.likeCount ?? 0,
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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, PatchProdApiQueryParams>({
    mutationFn: (params: PatchProdApiQueryParams) => patchProductAPI(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteProductResponse, Error, DeleteProductApiProps>({
    mutationFn: (params: DeleteProductApiProps) => deleteProductAPI(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
    onError: (error: any) => {
      throw error;
    },
  });
};
