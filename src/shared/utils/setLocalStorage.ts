"use client";

import { localStorageKeys } from "../service/codeit/codeitInstance";

/*
로그인/회원가입하고 로컬스토리지 저장
*/
export const setLocalStorage = ({
  refreshToken,
  accessToken,
}: {
  refreshToken?: string;
  accessToken: string;
}) => {
  localStorage.setItem(localStorageKeys.refreshToken, refreshToken ?? "");
  localStorage.setItem(localStorageKeys.accessToken, accessToken);
};
