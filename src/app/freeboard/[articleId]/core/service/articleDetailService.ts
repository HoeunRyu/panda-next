import { AxiosResponse } from "axios";
import { instance } from "@/shared/utils/APIs/axiosInstance";
import { Article } from "@/shared/type";

export interface GetArticleDetailApiProps {
  articleId: string;
}

/** 게시글 상세 조회
 */
export const getArticleDetailAPI = async ({
  articleId,
}: GetArticleDetailApiProps): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await instance.get(
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
  image?: string;
}

export const patchArticleAPI = async ({
  articleId,
  title,
  content,
  image,
}: PatchArticleApiProps): Promise<Article> => {
  try {
    const response: AxiosResponse<Article> = await instance.patch(
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
}: DeleteArticleApiProps): Promise<void> => {
  try {
    await instance.delete(`/articles/${articleId}`);
  } catch (err) {
    throw err;
  }
};
