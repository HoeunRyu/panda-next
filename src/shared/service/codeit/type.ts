export interface UserInfoResponse {
  id: number;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: string | null;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
}

export interface SignUpInputDto {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInInputDto {
  email: string;
  password: string;
}
