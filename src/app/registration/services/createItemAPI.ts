import { AxiosResponse } from "axios";
import { instance } from "@/shared/utils/APIs/axiosInstance";
import { PostProdApiQueryParams, Product } from "@/shared/type";

/** 상품 등록
 * @param {Object} params - 상품 정보
 * @param {string} params.name - 상품 이름
 * @param {string} params.description - 상품 설명
 * @param {int} params.price - 상품 가격
 * @param {string[]} params.tags - 상품 태그 목록
 * @param {string[]} params.images - 상품 이미지 목록
 */
export const createItemAPI = async (
  params: PostProdApiQueryParams
): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await instance.post(
      "/products",
      params
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
