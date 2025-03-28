import { createStore } from "./zustand/createStore";
import { MyUserInfoResponse, UserInfoResponse } from "../service/authTypes";

interface State {
  userInfo: MyUserInfoResponse | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUserInfo: (data: MyUserInfoResponse | null) => void;
  updateUserInfo: (data: Partial<MyUserInfoResponse>) => void;
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
