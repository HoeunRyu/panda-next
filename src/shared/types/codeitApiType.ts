// 코드잇 API 타입 정의

export type OrderByType = "recent" | "favorite";

// 상품 목록 조회 API 쿼리 파라미터
export interface GetCodeitProdApiQueryParams {
  page?: number;
  pageSize?: number;
  orderBy?: OrderByType;
  keyword?: string;
}

// 상품 목록 조회 API 응답 타입
export interface CodeitProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  ownerId: number;
  ownerNickname: string;
  favoriteCount: number;
  createdAt: string;
}

export interface GetCodeitProdApiResponse {
  totalCount: number;
  list: CodeitProduct[];
}

// 상품 상세 조회 API 응답 타입
export interface CodeitProductDetail {
  id: number;
  isFavorite: boolean;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  ownerId: number;
  ownerNickname: string;
  favoriteCount: number;
  createdAt: string;
}

// 상품 댓글 조회 쿼리 파라미터 타입
export interface GetCodeitProductCommentApiQueryParams {
  productId: number;
  cursor?: number;
  limit?: number;
}

// 상품 댓글 조회 API 응답 타입
export interface CodeitProductComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}

export interface GetCodeitProductCommentApiResponse {
  nextCursor: number;
  list: CodeitProductComment[];
}

// 상품 댓글 작성 API 요청 바디
export interface PostCodeitProductCommentApiParams {
  content: string;
}
