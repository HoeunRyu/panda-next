import { AxiosResponse } from "axios";
import { instance } from "@/shared/utils/APIs/axiosInstance";
import { CommentList } from "@/shared/type";

export interface GetCommentApiProps {
  itemId: string;
  lastCursor?: string | null;
  type: "articles" | "products";
}

/** 댓글 조회
 */
export const getCommentAPI = async ({
  itemId,
  lastCursor = null,
  type,
}: GetCommentApiProps): Promise<CommentList> => {
  const url = `/comments/${itemId}?type=${type}${
    lastCursor ? `&lastCursor=${lastCursor}` : ""
  }`;

  try {
    const response: AxiosResponse<CommentList> = await instance.get(url);
    // console.log("getComment", response.data);
    return response.data;
  } catch (err) {
    console.error("댓글 조회 실패:", err);
    throw err;
  }
};

export interface PostCommentApiProps {
  itemId: string;
  type: "articles" | "products";
  params: {
    content: string;
  };
}

/** 댓글 생성
 */
export const postCommentAPI = async ({
  itemId,
  type,
  params,
}: PostCommentApiProps): Promise<CommentList> => {
  const url = `/comments/${itemId}?type=${type}`;

  try {
    const response: AxiosResponse<CommentList> = await instance.post(
      url,
      params
    );
    // console.log("postComment", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 댓글 수정 */
export interface PatchCommentApiProps {
  id: string;
  type: "articles" | "products";
  params: {
    content: string;
  };
}

export const patchCommentAPI = async ({
  id,
  type,
  params,
}: PatchCommentApiProps): Promise<CommentList> => {
  const url = `/comments/${id}?type=${type}`;

  try {
    const response: AxiosResponse<CommentList> = await instance.patch(
      url,
      params
    );
    // console.log("patchComment", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

/** 댓글 삭제 */
export interface DeleteCommentApiProps {
  id: string;
  type: "articles" | "products";
}

export const deleteCommentAPI = async ({
  id,
  type,
}: DeleteCommentApiProps): Promise<CommentList> => {
  const url = `/comments/${id}?type=${type}`;

  try {
    const response: AxiosResponse<CommentList> = await instance.delete(url);
    // console.log("deleteComment", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
