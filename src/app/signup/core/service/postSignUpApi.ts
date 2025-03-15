// import { handleApiError } from "@/shared/service/auth/handleApiError";
import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import { AuthResponse, SignUpInputDto } from "@/shared/service/codeit/type";

/**
 * 회원가입 API
 * @param body 회원가입 정보(이메일, 닉네임, 비밀번호, 비밀번호 확인)
 */
export const postSignUpApi = async (
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
