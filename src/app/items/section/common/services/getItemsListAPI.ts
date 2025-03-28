import { AxiosResponse } from "axios";
import { myInstance } from "@/shared/service/myApi/myInstance";
import { GetProdApiQueryParams, ProductList, OrderByType } from "@/shared/type";

/** 상품 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {int} params.limit - 페이지 당 상품 수
 * @param {string} params.sort - 정렬 기준(recent, favorite)
 * @param {string} params.keyword - 검색 키워드
 */
export const getItemsListAPI = async (
  params: Partial<GetProdApiQueryParams> = {}
): Promise<ProductList> => {
  //쿼리 기본값
  const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = params;

  try {
    const response: AxiosResponse<ProductList> = await myInstance.get(
      "/products",
      {
        params: { page, pageSize, orderBy, keyword },
      }
    );
    response.status;

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const ORDER_BY: OrderByType = {
  RECENT: { value: "recent", name: "최신순" },
  FAVORITE: { value: "favorite", name: "좋아요순" },
};
