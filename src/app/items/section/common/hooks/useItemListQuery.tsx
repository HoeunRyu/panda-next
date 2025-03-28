import { useQuery } from "@tanstack/react-query";
import { useSearchStore } from "@/app/items/section/common/hooks/useSearchStore";
import { productKeys } from "@/shared/utils/queryKeys";
import { getItemsListAPI } from "../services/getItemsListAPI";
import { ProductList } from "@/shared/type";

// 기존 axios 요청 대신 useQuery 사용

export const useBestItems = (pageSize: number) => {
  const { data, isLoading } = useQuery<ProductList>({
    queryKey: productKeys.best(pageSize),
    queryFn: () => getItemsListAPI({ orderBy: "favorite", pageSize }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    products: data?.ProductList ?? [],
    isLoading,
  };
};

export const useItemList = () => {
  const { params } = useSearchStore();
  const { keyword = "", page = 1, orderBy = "recent", pageSize = 10 } = params;

  const MIN_LOADING_TIME = 500;

  const { data, isLoading, isFetching, refetch } = useQuery<ProductList>({
    queryKey: productKeys.list({
      keyword,
      page,
      orderBy,
      pageSize,
    }),
    queryFn: async () => {
      const startTime = Date.now();
      const response = await getItemsListAPI({
        keyword,
        orderBy,
        page,
        pageSize,
      });

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsedTime)
        );
      }

      return response;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // 기본 데이터 구조 생성
  const defaultData = {
    ProductList: Array(pageSize).fill(null),
    totalCount: pageSize * 5,
  };

  // 데이터가 없을 때 기본 데이터 사용
  const currentData = data ?? defaultData;
  const totalCount = data?.totalProducts ?? defaultData.totalCount;
  const currentPage = Number(page) || 1;
  const products = currentData.ProductList;

  return {
    products,
    totalCount,
    currentPage,
    isLoading: isLoading || isFetching,
    isFetching,
    refetch,
  };
};
