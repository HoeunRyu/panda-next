import axios, { AxiosInstance } from "axios";

// codeit 서버로 요청하는 instance
const instances: Record<string, AxiosInstance> = {};

const baseURL = "https://panda-market-api.vercel.app";

export const localStorageKeys = {
  accessToken: "acct",
  refreshToken: "reft",
};

const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(localStorageKeys.accessToken);
};

const AxiosDefault = (baseURL: string): AxiosInstance => {
  if (!instances[baseURL]) {
    const axiosInstance = createAxiosInstance(baseURL);
    requestInterceptor(axiosInstance);
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
  });
  return axiosInstance;
};

const requestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    function (config) {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

//TODO: 토큰만료시 토큰 갱신 로직 추가해야됨
const responseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(function (response) {
    return response;
  });
};

export const codeitInstance = AxiosDefault(baseURL);
