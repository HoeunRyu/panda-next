import { AxiosResponse } from "axios";
import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import {
  GetCodeitProdApiQueryParams,
  GetCodeitProdApiResponse,
} from "@/shared/types/codeitApiType";

/** 상품 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지 번호
 * @param {int} params.pageSize - 페이지 당 상품 수
 * @param {string} params.orderBy - 정렬 기준(recent, favorite)
 * @param {string} params.keyword - 검색 키워드
 */
export const getCodeitItemListAPI = async (
  params: Partial<GetCodeitProdApiQueryParams> = {}
): Promise<GetCodeitProdApiResponse> => {
  //쿼리 기본값
  const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = params;

  try {
    const response: AxiosResponse<GetCodeitProdApiResponse> =
      await codeitInstance.get("/products", {
        params: { page, pageSize, orderBy, keyword },
      });
    response.status;
    // console.log("getItemsList", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const ORDER_BY = {
  RECENT: { value: "recent", name: "최신순" },
  FAVORITE: { value: "favorite", name: "좋아요순" },
};
