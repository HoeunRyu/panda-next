import { codeitInstance } from "./codeit/codeitInstance";
import { handleApiError } from "./handleApiError";
import { UserInfoResponse } from "./authTypes";

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const response = await codeitInstance.get<UserInfoResponse>("/users/me");
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
};
