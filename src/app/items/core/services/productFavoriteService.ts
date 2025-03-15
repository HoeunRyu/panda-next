import { AxiosResponse } from "axios";
import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import { CodeitProductDetail } from "@/shared/types/codeitApiType";

export interface PostProductFavoriteApiProps {
  productId: string;
}

/** 상품 좋아요
 */
export const postCodeitProductFavoriteAPI = async ({
  productId,
}: PostProductFavoriteApiProps): Promise<CodeitProductDetail> => {
  try {
    const response: AxiosResponse<CodeitProductDetail> =
      await codeitInstance.post(`/products/${productId}/favorite`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 상품 좋아요 취소 */
export interface DeleteProductFavoriteApiParams {
  productId: string;
}

export const deleteCodeitProductFavoriteAPI = async ({
  productId,
}: DeleteProductFavoriteApiParams): Promise<CodeitProductDetail> => {
  try {
    const response: AxiosResponse<CodeitProductDetail> =
      await codeitInstance.delete(`/products/${productId}/favorite`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
