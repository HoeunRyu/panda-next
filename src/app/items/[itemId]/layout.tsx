"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { useUserStore } from "@/shared/store/useUserStore";

// 인가된 이용자만 상세페이지 접근 가능 -> 인가되지 않은 경우 '/login' 페이지로 이동시킴
export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitialized } = useUserStore();
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();

  useEffect(() => {
    if (!isInitialized || !isAuthenticated) {
      router.replace("/login");
      openSnackbar("로그인 후 이용해주세요.", "error");
    }
  }, [isInitialized, isAuthenticated]);

  if (!isInitialized || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
