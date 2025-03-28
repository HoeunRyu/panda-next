import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
// import { handleApiError } from "@/shared/service/auth/handleApiError";
import {
  AuthResponse,
  MyAuthResponse,
  SignInInputDto,
} from "@/shared/service/authTypes";
import { myInstance } from "@/shared/service/myApi/myInstance";

/**
 * 코드잇 로그인 API
 * @param body 로그인 정보(이메일, 비밀번호)
 */
export const postCodeitSignInApi = async (
  body: SignInInputDto
): Promise<AuthResponse> => {
  try {
    const response = await codeitInstance.post<AuthResponse>(
      "/auth/signIn",
      body
    );
    return response.data;
  } catch (err) {
    // throw handleApiError(err);
    throw err;
  }
};

/**
 * 직접 만든 백엔드로 로그인 요청 보내는 API
 * @param body 로그인 정보(이메일, 비밀번호)
 */
export const postSignInApi = async (
  body: SignInInputDto
): Promise<MyAuthResponse> => {
  try {
    const response = await myInstance.post<MyAuthResponse>(
      "/auth/signin",
      body
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
