"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { localStorageKeys } from "@/shared/service/codeit/codeitInstance";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";

// 로그인/회원가입 페이지에 접근 시 로컬 스토리지에 accessToken이 있는 경우 '/items' 페이지로 이동합니다.
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // localStorage 접근을 클라이언트 사이드로 이동
    const token = localStorage.getItem(localStorageKeys.accessToken);
    setAccessToken(token);

    if (token) {
      router.replace("/items");
      openSnackbar("이미 로그인 되어있습니다.", "error");
    }
  }, []);

  if (accessToken) {
    return null;
  }

  return <>{children}</>;
}
