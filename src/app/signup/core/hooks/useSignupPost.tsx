import { useUserStore } from "@/shared/store/useUserStore";
import { useRouter } from "next/navigation";
import { postSignUpApi } from "../service/postSignUpApi";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { useQueryClient } from "@tanstack/react-query";
import {
  codeitItemKeys,
  articleKeys,
  commentKeys,
} from "@/shared/utils/queryKeys";
// import { setLocalStorage } from "@/shared/utils/setLocalStorage";

interface SignupProps {
  email: string;
  nickname: string;
  password: string;
  // passwordConfirmation: string;
}

export const useSignupPost = ({
  email,
  nickname,
  password,
}: // passwordConfirmation,
SignupProps) => {
  const router = useRouter();
  const changeCurrentUser = useUserStore((state) => state.setUserInfo);
  const setIsAuthenticated = useUserStore((state) => state.setIsAuthenticated);
  const queryClient = useQueryClient();

  const handleClickSignup = async () => {
    const { openSnackbar } = useSnackbarStore.getState();

    try {
      // 회원가입 요청 - 제작한 백엔드에는 비밀번호 확인란 안보냄
      const data = await postSignUpApi({
        email,
        nickname,
        password,
      });

      // 로컬스토리지에 토큰 저장 - 세션 쿠키 방식으로 변경됨
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

      openSnackbar("회원가입이 완료되었습니다.", "success");
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
        if (errorMessage === "이미 가입된 이메일입니다.") {
          openSnackbar("이미 가입된 이메일입니다.", "error");
        } else {
          openSnackbar("다시 시도해주세요.", "error");
        }
      }
    }
  };

  return {
    handleClickSignup,
  };
};
