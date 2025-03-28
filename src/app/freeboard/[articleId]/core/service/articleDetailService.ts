import { AxiosResponse } from "axios";
import { myInstance } from "@/shared/service/myApi/myInstance";
import { Article, DeleteCommentResponse } from "@/shared/type";

export interface GetArticleDetailApiProps {
  articleId: string;
}

/** 게시글 상세 조회
 */
export const getArticleDetailAPI = async ({
  articleId,
}: GetArticleDetailApiProps): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await myInstance.get(
      `/articles/${articleId}`
    );
    // console.log("getArticleDetail", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 게시글 수정 */
export interface PatchArticleApiProps {
  articleId: string;
  title: string;
  content: string;
  image?: File;
}

export const patchArticleAPI = async ({
  articleId,
  title,
  content,
  image,
}: PatchArticleApiProps): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await myInstance.patch(
      `/articles/${articleId}`,
      { title, content, image }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 게시글 삭제 */
export interface DeleteArticleApiProps {
  articleId: string;
}

export const deleteArticleAPI = async ({
  articleId,
}: DeleteArticleApiProps): Promise<DeleteCommentResponse> => {
  try {
    const response: AxiosResponse<DeleteCommentResponse> =
      await myInstance.delete(`/articles/${articleId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
