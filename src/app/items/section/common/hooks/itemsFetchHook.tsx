import { useEffect, useCallback, useState } from "react";
import { getItemsListAPI } from "../../../../../shared/utils/APIs/getItemsListAPI";
import { GetProdApiQueryParams, Product, ProductList } from "@/shared/type";
import { ProductState } from "@/shared/type";

interface UseItemsFetchOutput {
  isLoading: boolean;
  productList: Product[];
  totalPages: number;
}

/**
 * params 변경시 getItemsDataAPI 호출
 * @param {object} params {page: int, limit: int, sort: string, keyword: string}
 * @returns {object} { productList: [], totalPages: 0, isLoading: boolean }
 * @description productList는 각 상품별 이름, 가격, 이미지 링크 등 데이터가 담긴 객체 배열
 */
export const useItemsFetch = (
  params: GetProdApiQueryParams
): UseItemsFetchOutput => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ProductState>({
    ProductList: [],
    totalPages: 1,
  });

  const fetchItems = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const startTime = Date.now();

      // console.log("쿼리 파라미터: ", params);
      const response: ProductList = await getItemsListAPI(params);
      setData({
        ProductList: response.ProductList,
        totalPages: response.totalPages,
      });

      // 경과시간 계산
      const elTime: number = Date.now() - startTime;
      const remainingTime: number = Math.max(500 - elTime, 0);

      // 최소 시간 지연(스켈레톤 보여주는 로딩 최소 시간)
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    } catch (error) {
      console.error("상품 목록 불러오기 오류: ", error);
    } finally {
      setIsLoading(false); //API실행이 종료되면 섹션 로딩 상태 종료
    }
  }, [params]); //의존성 배열이 업데이트되면, 그에 따라 콜백함수도 업데이트됨

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    isLoading,
    productList: data.ProductList,
    totalPages: data.totalPages,
  };
};
