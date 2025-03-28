import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/shared/store/useUserStore";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { postSignInApi } from "../service/postSignInApi";
import { setLocalStorage } from "@/shared/utils/setLocalStorage";
import {
  codeitItemKeys,
  articleKeys,
  commentKeys,
} from "@/shared/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

export const useLoginPost = () => {
  const [isShowPasswordText, setIsShowPasswordText] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState({
    isError: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const changeCurrentUser = useUserStore((state) => state.setUserInfo);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const { openSnackbar } = useSnackbarStore.getState();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === "email") {
      if (value.length > 0) {
        setEmailError({
          isError: !validateEmail(value),
          message: !validateEmail(value) ? "잘못된 이메일 형식입니다." : "",
        });
      } else {
        setEmailError({ isError: false, message: "" });
      }
    }

    if (name === "password") {
      if (value.length > 0) {
        setPasswordError({
          isError: !validatePassword(value),
          message: !validatePassword(value)
            ? "비밀번호를 8자 이상 입력해주세요."
            : "",
        });
      } else {
        setPasswordError({ isError: false, message: "" });
      }
    }
  };

  const isFormValid = () => {
    return (
      validateEmail(inputValue.email) &&
      validatePassword(inputValue.password) &&
      !emailError.isError &&
      !passwordError.isError
    );
  };

  const handleIsShowPassword = () => setIsShowPasswordText(!isShowPasswordText);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!isFormValid()) return;

    try {
      const data = await postSignInApi({
        email: inputValue.email,
        password: inputValue.password,
      });

      // 로컬스토리지에 토큰 저장
      // setLocalStorage({
      //   accessToken: data.accessToken,
      //   refreshToken: data.refreshToken,
      // });

      // 관련 쿼리 모두 무효화
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
      queryClient.invalidateQueries({ queryKey: articleKeys.all });
      queryClient.invalidateQueries({ queryKey: codeitItemKeys.all });

      // 전역 user 데이터 업데이트
      changeCurrentUser({
        id: data.id,
        nickname: data.nickname,
        image: null,
        updatedAt: data.updatedAt,
        createdAt: data.createdAt,
      });

      // 전역 인증 상태 업데이트 -> 로그인 완료 시 헤더 프로필 변경
      setIsAuthenticated(true);

      openSnackbar("로그인되었습니다.", "success");
      router.push("/items"); //중고마켓 페이지로 이동
    } catch (error) {
      const err = error as any;
      const statusCode = err.response?.status;
      const errorMessage = err.response?.data?.message;

      // 500대 서버 에러일 경우
      if (statusCode >= 500) {
        openSnackbar("다시 시도해주세요.", "error");
      }
      // 400대 클라이언트 에러일 경우 에러메시지 그대로 출력
      else if (statusCode >= 400) {
        openSnackbar(errorMessage || "로그인에 실패했습니다.", "error");
      }
    }
  };

  return {
    isShowPasswordText,
    inputValue,
    emailError,
    passwordError,
    handleInputValue,
    handleIsShowPassword,
    handleSubmit,
    isFormValid,
  };
};
