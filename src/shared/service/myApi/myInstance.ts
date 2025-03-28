import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

// 백엔드 미션에서 제작한 서버로 요청하는 instance
const instances: Record<string, AxiosInstance> = {};

const baseURL = "https://panda-prisma.onrender.com";

const AxiosDefault = (baseURL: string): AxiosInstance => {
  if (!instances[baseURL]) {
    const axiosInstance = createAxiosInstance(baseURL);
    responseInterceptor(axiosInstance);
    instances[baseURL] = axiosInstance;
  }
  return instances[baseURL];
};

const createAxiosInstance = (baseURL: string) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키를 주고받기 위해 필요한 설정
  });
  return axiosInstance;
};

const responseInterceptor = (axiosInstance: AxiosInstance) => {
  // 응답 인터셉터 추가
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      // 401 에러 처리 (인증 만료)
      if (error.response?.status === 401) {
        // 웹 로그인 필요한 서비스인 경우 alert 표시
        if (typeof window !== "undefined") {
          const { openSnackbar } = useSnackbarStore.getState();
          openSnackbar("로그인 후 이용해주세요.", "error");
        }
      }
      return Promise.reject(error);
    }
  );
};

export const myInstance = AxiosDefault(baseURL);
