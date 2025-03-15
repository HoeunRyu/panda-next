import { AxiosResponse } from "axios";
import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import {
  CodeitProductComment,
  GetCodeitProductCommentApiResponse,
} from "@/shared/types/codeitApiType";

export interface GetProductCommentListApiProps {
  productId: string;
  cursor?: number | null;
  limit?: number;
}

/** 상품 댓글 목록 조회
 */
export const getCodeitProductCommentListAPI = async ({
  productId,
  cursor,
  limit = 10,
}: GetProductCommentListApiProps): Promise<GetCodeitProductCommentApiResponse> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", limit.toString());
    if (cursor !== null && cursor !== undefined) {
      queryParams.append("cursor", cursor.toString());
    }

    const response: AxiosResponse<GetCodeitProductCommentApiResponse> =
      await codeitInstance.get(
        `/products/${productId}/comments?${queryParams.toString()}`
      );

    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 상품 댓글 작성 */
export interface PostCodeitProductCommentApiParams {
  productId: string;
  content: string;
}

export const postCodeitProductCommentAPI = async ({
  productId,
  content,
}: PostCodeitProductCommentApiParams): Promise<CodeitProductComment> => {
  try {
    const response: AxiosResponse<CodeitProductComment> =
      await codeitInstance.post(`/products/${productId}/comments`, { content });
    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 상품 댓글 수정 */
export interface PatchProductCommentApiProps {
  commentId: number;
  content: string;
}

export const patchCodeitProductCommentAPI = async ({
  commentId,
  content,
}: PatchProductCommentApiProps): Promise<CodeitProductComment> => {
  try {
    const response: AxiosResponse<CodeitProductComment> =
      await codeitInstance.patch(`/comments/${commentId}`, { content });
    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 상품 댓글 삭제 */
export interface DeleteProductCommentApiProps {
  commentId: number;
}

export const deleteCodeitProductCommentAPI = async ({
  commentId,
}: DeleteProductCommentApiProps): Promise<void> => {
  try {
    await codeitInstance.delete(`/comments/${commentId}`);
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw err;
  }
};
