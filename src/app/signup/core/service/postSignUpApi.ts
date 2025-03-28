// import { handleApiError } from "@/shared/service/auth/handleApiError";
import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import {
  AuthResponse,
  MySignupInputDto,
  MyAuthResponse,
  SignUpInputDto,
} from "@/shared/service/authTypes";
import { myInstance } from "@/shared/service/myApi/myInstance";

/**
 * 회원가입 API
 * @param body 회원가입 정보(이메일, 닉네임, 비밀번호, 비밀번호 확인)
 */
export const postCodeitSignUpApi = async (
  body: SignUpInputDto
): Promise<AuthResponse> => {
  try {
    const response = await codeitInstance.post<AuthResponse>(
      "/auth/signUp",
      body
    );
    return response.data;
  } catch (err) {
    // throw handleApiError(err);
    throw err;
  }
};

/**
 * 직접 만든 백엔드로 회원가입 요청 보내는 API
 * @param body 회원가입 정보(이메일, 닉네임, 비밀번호, 비밀번호 확인)
 */
export const postSignUpApi = async (
  body: MySignupInputDto
): Promise<MyAuthResponse> => {
  try {
    const response = await myInstance.post<MyAuthResponse>(
      "/auth/signup",
      body
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
