import { GetCodeitProdApiResponse } from "@/shared/types/codeitApiType";
import { useQuery } from "@tanstack/react-query";
import { getCodeitItemListAPI } from "@/app/items/section/common/services/getCodeitItemListApi";
import { useSearchStore } from "@/app/items/section/common/hooks/useSearchStore";
import { codeitItemKeys } from "@/shared/utils/queryKeys";

// 코드잇 서버에서 상품 목록 조회
// 기존 axios 요청 대신 useQuery 사용

export const useCodeitBestItems = (pageSize: number) => {
  const orderBy = "favorite";

  const { data, isLoading } = useQuery<GetCodeitProdApiResponse>({
    queryKey: codeitItemKeys.best(pageSize),
    queryFn: () => getCodeitItemListAPI({ orderBy, pageSize }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    products: data?.list ?? [],
    isLoading,
  };
};

export const useCodeitItemList = () => {
  const { params } = useSearchStore();
  const { keyword = "", page = 1, orderBy = "recent", pageSize = 10 } = params;

  const MIN_LOADING_TIME = 500;

  const { data, isLoading, isFetching, refetch } =
    useQuery<GetCodeitProdApiResponse>({
      queryKey: codeitItemKeys.list({
        keyword,
        page,
        orderBy,
        pageSize,
      }),
      queryFn: async () => {
        const startTime = Date.now();
        const response = await getCodeitItemListAPI({
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
    list: Array(pageSize).fill(null),
    totalCount: pageSize * 5,
  };

  // 데이터가 없을 때 기본 데이터 사용
  const currentData = data ?? defaultData;
  const totalCount = currentData.totalCount;
  const currentPage = Number(page) || 1;
  const products = currentData.list;

  return {
    products,
    totalCount,
    currentPage,
    isLoading: isLoading || isFetching,
    isFetching,
    refetch,
  };
};
