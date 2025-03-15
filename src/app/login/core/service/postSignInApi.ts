import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
// import { handleApiError } from "@/shared/service/auth/handleApiError";
import { AuthResponse, SignInInputDto } from "@/shared/service/codeit/type";

/**
 * 로그인 API
 * @param body 로그인 정보(이메일, 비밀번호)
 */
export const postSignInApi = async (
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
