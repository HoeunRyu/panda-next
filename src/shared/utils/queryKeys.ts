export const commentKeys = {
  all: ["comment"] as const,
  list: (itemId: string, type: string) =>
    [...commentKeys.all, itemId, type] as const,
};

export const articleKeys = {
  all: ["articles"] as const,
  best: (limit: number) => [...articleKeys.all, "best", limit] as const,
  list: (params: { keyword: string; page: number; sort: string }) =>
    [...articleKeys.all, "list", params] as const,
  detail: (articleId: string) =>
    [...articleKeys.all, "detail", articleId] as const,
};

export const productKeys = {
  all: ["products"] as const,
  best: (limit: number) => [...productKeys.all, "best", limit] as const,
  list: (params: {
    keyword: string;
    page: number;
    orderBy: string;
    pageSize: number;
  }) => [...productKeys.all, "list", params] as const,
  detail: (productId: string) =>
    [...productKeys.all, "detail", productId] as const,
};

export const codeitItemKeys = {
  all: ["products"] as const,
  best: (pageSize: number) =>
    [...codeitItemKeys.all, "best", pageSize] as const,
  list: (params: {
    keyword: string;
    page: number;
    orderBy: string;
    pageSize: number;
  }) => [...codeitItemKeys.all, "list", params] as const,
  detail: (productId: string) =>
    [...codeitItemKeys.all, "detail", productId] as const,
};

export const codeitProductCommentKeys = {
  all: ["codeitProductComments"] as const,
  list: (productId: string) =>
    [...codeitProductCommentKeys.all, productId] as const,
};
