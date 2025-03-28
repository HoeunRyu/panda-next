"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { localStorageKeys } from "@/shared/service/codeit/codeitInstance";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { useUserStore } from "@/shared/store/useUserStore";

// 로그인/회원가입 페이지에 접근 시 로컬 스토리지에 accessToken이 있는 경우 '/items' 페이지로 이동합니다.
// -> 로컬스토리지 확인 안하고, userStore 상태 확인하는 걸로 수정
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    // const token = localStorage.getItem(localStorageKeys.accessToken);
    // setAccessToken(token);

    if (isAuthenticated) {
      router.replace("/items");
      openSnackbar("이미 로그인 되어있습니다.", "error");
    }
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
