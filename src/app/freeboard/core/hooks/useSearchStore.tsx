"use client";

import { create } from "zustand";
import { GetArticleApiQueryParams } from "@/shared/type";

interface SearchStore {
  params: GetArticleApiQueryParams;
  updateParams: (field: string, value: string | string[]) => void;
  reset: () => void;
}

//쿼리 기본값
const initialState: GetArticleApiQueryParams = {
  keyword: "",
  sort: "recent",
  page: 1,
  limit: 10,
};

export const useSearchStore = create<SearchStore>((set) => ({
  params: initialState,

  updateParams: (field, value) =>
    set((state) => ({
      params: { ...state.params, [field]: value },
    })),

  reset: () => set({ params: initialState }),
}));
