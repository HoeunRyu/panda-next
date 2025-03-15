import axios, { AxiosInstance } from "axios";

// 백엔드 미션에서 제작한 서버로 요청하는 instance
//백엔드 제작해서 배포한 링크로 수정한 상태.
export const instance: AxiosInstance = axios.create({
  baseURL: "https://panda-prisma.onrender.com",
});
