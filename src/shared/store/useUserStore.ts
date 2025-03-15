import { createStore } from "./zustand/createStore";
import { UserInfoResponse } from "../service/codeit/type";

interface State {
  userInfo: UserInfoResponse | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUserInfo: (data: UserInfoResponse | null) => void;
  updateUserInfo: (data: Partial<UserInfoResponse>) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsInitialized: (value: boolean) => void;
}

export const useUserStore = createStore<State>((set, get) => ({
  userInfo: null,
  isAuthenticated: false,
  isInitialized: false,
  setUserInfo: (data) =>
    set((state) => {
      state.userInfo = data;
    }),
  updateUserInfo: (data) =>
    set((state) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          ...data,
        };
      }
    }),
  setIsAuthenticated: (value) =>
    set((state) => {
      state.isAuthenticated = value;
    }),
  setIsInitialized: (value) =>
    set((state) => {
      state.isInitialized = value;
    }),
}));
