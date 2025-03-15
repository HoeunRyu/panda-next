"use client";

import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { getUserInfo } from "../service/codeit/getUserInfo";
import { localStorageKeys } from "../service/codeit/codeitInstance";

export const useInitializeAuth = () => {
  const { setUserInfo, setIsAuthenticated, setIsInitialized } = useUserStore();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem(localStorageKeys.accessToken);
      const refreshToken = localStorage.getItem(localStorageKeys.refreshToken);

      // 토큰이 없으면 로그인 상태 초기화
      if (!accessToken || !refreshToken) {
        setIsAuthenticated(false);
        setUserInfo(null);
        setIsInitialized(true);
        return;
      }

      // 토큰이 있으면 유저 정보 가져와서 저장, 로그인 상태 업데이트
      try {
        const response = await getUserInfo();
        setUserInfo(response);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setUserInfo(null);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setUserInfo, setIsAuthenticated, setIsInitialized]);
};

/**
 * 최초 진입 시 로그인 상태 확인 후 초기화/유저 정보 업데이트
 */
export const AuthInitializer = () => {
  useInitializeAuth();
  return null;
};
