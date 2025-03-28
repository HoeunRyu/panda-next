import { AxiosResponse } from "axios";
import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import { CodeitProductDetail } from "@/shared/types/codeitApiType";
import { myInstance } from "@/shared/service/myApi/myInstance";
import { ProductLikeResponse } from "@/shared/type";

export interface PostProductFavoriteApiProps {
  productId: string;
}
export interface DeleteProductFavoriteApiParams {
  productId: string;
}

/** 상품 좋아요 코드잇 api */
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

/** 상품 좋아요 미션 api */
export const postProductLikeAPI = async ({
  productId,
}: PostProductFavoriteApiProps): Promise<ProductLikeResponse> => {
  try {
    const response: AxiosResponse<ProductLikeResponse> =
      await myInstance.post(`/products/${productId}/like`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 상품 좋아요 취소 코드잇 api */
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

/** 상품 좋아요 취소 미션 api */
export const deleteProductLikeAPI = async ({
  productId,
}: DeleteProductFavoriteApiParams): Promise<ProductLikeResponse> => {
  try {
    const response: AxiosResponse<ProductLikeResponse> =
      await myInstance.delete(`/products/${productId}/like`);

    return response.data;
  } catch (err) {
    throw err;
