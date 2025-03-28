import { AxiosResponse } from "axios";
import { myInstance } from "@/shared/service/myApi/myInstance";
import { ArticleLikeResponse } from "@/shared/type";

export interface ArticleLikeApiProps {
  articleId: string;
}

/** 게시글 좋아요 미션 api */
export const postArticleLikeAPI = async ({
  articleId,
}: ArticleLikeApiProps): Promise<ArticleLikeResponse> => {
  try {
    const response: AxiosResponse<ArticleLikeResponse> = await myInstance.post(
      `/articles/${articleId}/like`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 게시글 좋아요 취소 미션 api */
export const deleteArticleLikeAPI = async ({
  articleId,
}: ArticleLikeApiProps): Promise<ArticleLikeResponse> => {
  try {
    const response: AxiosResponse<ArticleLikeResponse> =
      await myInstance.delete(`/articles/${articleId}/like`);

    return response.data;
  } catch (err) {
    throw err;
  }
};
