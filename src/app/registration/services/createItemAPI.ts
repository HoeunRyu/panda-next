import { AxiosResponse } from "axios";
import { myInstance } from "@/shared/service/myApi/myInstance";
import { PostProdApiQueryParams, Product } from "@/shared/type";

/** 상품 등록
 * @param {Object} params - 상품 정보
 * @param {string} params.name - 상품 이름 (10자 이내)
 * @param {string} params.description - 상품 설명 (10-100자)
 * @param {number} params.price - 상품 가격 (1원 이상)
 * @param {string[]} params.tags - 상품 태그 목록 (선택사항)
 * @param {File[]} params.images - 상품 이미지 파일 목록 (1-3개, 각 5MB 이하)
 */
export const createItemAPI = async (
  params: PostProdApiQueryParams
): Promise<Product> => {
  try {
    const formData = new FormData();

    // 기본 필드 추가
    formData.append("name", params.name);
    formData.append("description", params.description);
    formData.append("price", params.price);

    // 태그가 있는 경우 추가
    if (params.tags && params.tags.length > 0) {
      params.tags.forEach((tag) => formData.append("tags", tag));
    }

    // 이미지 파일 추가
    if (params.images && params.images.length > 0) {
      params.images.forEach((image) => formData.append("images", image));
    }

    const response: AxiosResponse<Product> = await myInstance.post(
      "/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
