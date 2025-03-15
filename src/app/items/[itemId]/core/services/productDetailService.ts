import { AxiosResponse } from "axios";
import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import { CodeitProductDetail } from "@/shared/types/codeitApiType";

export interface GetProductDetailApiProps {
  productId: string;
}

/** 상품 상세 조회
 */
export const getCodeitProductDetailAPI = async ({
  productId,
}: GetProductDetailApiProps): Promise<CodeitProductDetail> => {
  try {
    const response: AxiosResponse<CodeitProductDetail> =
      await codeitInstance.get(`/products/${productId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 상품 수정 */
export interface PatchCodeitProductApiProps {
  productId: string;
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  tags?: string[];
}

export const patchCodeitProductAPI = async ({
  productId,
  name,
  description,
  price,
  images,
  tags,
}: PatchCodeitProductApiProps): Promise<CodeitProductDetail> => {
  try {
    const response: AxiosResponse<CodeitProductDetail> =
      await codeitInstance.patch(`/products/${productId}`, {
        name,
        description,
        price,
        images,
        tags,
      });
    return response.data;
  } catch (err: any) {
    throw err;
  }
};

/** 상품 삭제 */
export interface DeleteProductApiProps {
  productId: string;
}

export const deleteCodeitProductAPI = async ({
  productId,
}: DeleteProductApiProps): Promise<void> => {
  try {
    await codeitInstance.delete(`/products/${productId}`);
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw err;
  }
};
