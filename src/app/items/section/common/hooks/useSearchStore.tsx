"use client";

import { create } from "zustand";
import { GetCodeitProdApiQueryParams } from "@/shared/types/codeitApiType";

interface SearchStore {
  params: GetCodeitProdApiQueryParams;
  updateParams: (field: string, value: string | string[]) => void;
  reset: () => void;
}

//쿼리 기본값
const initialState: GetCodeitProdApiQueryParams = {
  page: 1,
  pageSize: 10,
  orderBy: "recent",
  keyword: "",
};

export const useSearchStore = create<SearchStore>((set) => ({
  params: initialState,

  updateParams: (field, value) =>
    set((state) => ({
      params: { ...state.params, [field]: value },
    })),

  reset: () => set({ params: initialState }),
}));
