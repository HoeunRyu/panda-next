import { AxiosResponse } from "axios";
import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import { CodeitProductDetail } from "@/shared/types/codeitApiType";
import { myInstance } from "@/shared/service/myApi/myInstance";
import {
  DeleteProductResponse,
  PatchProdApiQueryParams,
  Product,
} from "@/shared/type";

export interface GetProductDetailApiProps {
  productId: string;
}

/** 상품 상세 조회 코드잇 api */
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

/** 상품 상세 조회 미션 api */
export const getProductDetailAPI = async ({
  productId,
}: GetProductDetailApiProps): Promise<Product> => {
  try {
    const response: AxiosResponse<Product> = await myInstance.get(
      `/products/${productId}`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 상품 수정 코드잇 api */
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

/** 상품 수정 미션 api */
export const patchProductAPI = async ({
  productId,
  name,
  description,
  price,
  tags,
  images,
}: PatchProdApiQueryParams): Promise<Product> => {
  try {
    const formData = new FormData();

    // 기본 필드 추가
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    // 태그가 있는 경우 추가
    if (tags && tags.length > 0) {
      tags.forEach((tag) => formData.append("tags", tag));
    }

    // 이미지 파일 추가
    if (images && images.length > 0) {
      images.forEach((image) => formData.append("images", image));
    }

    const response: AxiosResponse<Product> = await myInstance.patch(
      `/products/${productId}`,
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

/** 상품 삭제 코드잇 api */
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

/** 상품 삭제 미션 api */
export const deleteProductAPI = async ({
  productId,
}: DeleteProductApiProps): Promise<DeleteProductResponse> => {
  try {
    const response: AxiosResponse<DeleteProductResponse> =
      await myInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
