export type ScreenSizeType = "MOBILE" | "TABLET" | "DESKTOP";

//상품 getAPI 쿼리 파라미터
export interface GetProdApiQueryParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

//상품 postAPI 쿼리 파라미터
export interface PostProdApiQueryParams {
  name: string;
  description: string;
  price: string;
  tags?: string[];
  images?: File[];
}

// 상품 patch 쿼리 파라미터
export interface PatchProdApiQueryParams {
  productId: string;
  name: string;
  description: string;
  price: string;
  tags?: string[];
  images?: (File | string)[];
}

// 태그 타입
export interface ProductTag {
  id: number;
  tag: string;
}

//상세 조회 응답 객체
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  ProductTag: ProductTag[];
  likeCount: number;
  isLiked: boolean;
  ownerId: string;
  ownerNickname: string;
  createdAt: string;
  updatedAt: string;
}

//상품 목록 조회 응답 객체
export interface ProductList {
  ProductList: Product[];
  totalPages: number;
  totalProducts: number;
}

export interface DeleteProductResponse {
  isSuccess: boolean;
  message: string;
}

export type ProductState = Pick<ProductList, "ProductList" | "totalPages">;

//정렬 기준
export interface OrderByItem {
  value: string;
  name: string;
}

export interface OrderByType {
  RECENT: OrderByItem;
  FAVORITE: OrderByItem;
}

//게시글 getAPI 쿼리 파라미터
export interface GetArticleApiQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
}

//게시글 postAPI 쿼리 파라미터
export interface PostArticleApiQueryParams {
  title: string;
  content: string;
  image?: File;
}

//게시글 getAPI 응답 객체
export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  isLiked: boolean;
  ownerId: string;
  ownerNickname: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleList {
  ArticleList: Article[];
  page: number;
  limit: number;
  sort: string;
  keyword: string;
  status: number;
  totalPages: number;
  totalArticles: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: string;
    nickname: string;
  };
}

export interface CommentList {
  status: number;
  idField: string;
  commentsList: Comment[];
  lastCursor: string | null;
}

export interface DeleteCommentResponse {
  isSuccess: boolean;
  message: string;
}

export interface ProductLikeResponse {
  isSuccess: boolean;
  data: Product;
}

export interface ArticleLikeResponse {
  isSuccess: boolean;
  data: Article;
}
