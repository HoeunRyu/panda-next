export type ScreenSizeType = "MOBILE" | "TABLET" | "DESKTOP";

//상품 getAPI 쿼리 파라미터
export interface GetProdApiQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
}

//상품 postAPI 쿼리 파라미터
export interface PostProdApiQueryParams {
  name: string;
  description?: string;
  price?: string;
  tags?: string[];
  images?: string[];
}

//getAPI 응답 객체
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  favoritesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductList {
  ProductList: Product[];
  page: number;
  limit: number;
  sort: string;
  keyword: string;
  status: number;
  totalPages: number;
  totalProducts: number;
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
  image?: string;
}

//게시글 getAPI 응답 객체
export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  favoritesCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
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
}

export interface CommentList {
  status: number;
  idField: string;
  commentsList: Comment[];
  lastCursor: string | null;
}
