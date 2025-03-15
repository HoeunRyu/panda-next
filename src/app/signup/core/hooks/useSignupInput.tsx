import { useState, useEffect } from "react";

interface EmailError {
  isError: boolean;
  message: string;
}

type PasswordMatchStatus = "init" | "same" | "notSame";

export const useSignupInput = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<EmailError>({
    isError: false,
    message: "",
  });
  const [nickname, setNickname] = useState<string>("");
  const [inputPassword, setInputPassword] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: false,
    message: "",
  });
  const [isShowPasswordText, setIsShowPasswordText] = useState(false);
  const [isShowConfirmPasswordText, setIsShowConfirmPasswordText] =
    useState(false);
  const [isPasswordSame, setIsPasswordSame] =
    useState<PasswordMatchStatus>("init");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // 이메일 유효성 검사
  const isEmailValid = (email: string): boolean => {
    return email.length > 0 && validateEmail(email);
  };

  // 이메일 입력 처리
  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value.length > 0) {
      const isValid = validateEmail(value);
      setEmailError({
        isError: !isValid,
        message: !isValid ? "잘못된 이메일 형식입니다." : "",
      });
    } else {
      setEmailError({ isError: false, message: "" });
    }
  };

  // 닉네임 입력 처리
  const handleNicknameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNickname(value);
  };

  // 비밀번호 유효성 검사 상태
  const [passwordValidation, setPasswordValidation] = useState({
    isLengthValid: false, // 8자 이상
  });

  // 비밀번호 입력 처리
  const handleInputPw = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputPassword({
      ...inputPassword,
      [name]: value,
    });
  };

  // 비밀번호 유효성 검사
  useEffect(() => {
    const password = inputPassword.password;

    if (password.length === 0) {
      setPasswordError({ isError: false, message: "" });
      return;
    }

    // 8자 이상 검사
    const isLengthValid = password.length >= 8;

    setPasswordValidation({
      isLengthValid,
    });

    // 에러 메시지 설정
    if (!isLengthValid) {
      setPasswordError({
        isError: true,
        message: "비밀번호를 8자 이상 입력해주세요.",
      });
    } else {
      setPasswordError({ isError: false, message: "" });
    }
  }, [inputPassword.password]);

  // 비밀번호 일치 여부 검사
  useEffect(() => {
    if (inputPassword.passwordConfirmation === "") {
      setIsPasswordSame("init");
    } else if (inputPassword.password === inputPassword.passwordConfirmation) {
      setIsPasswordSame("same");
    } else {
      setIsPasswordSame("notSame");
    }
  }, [inputPassword.password, inputPassword.passwordConfirmation]);

  const handleIsShowPassword = (field: "password" | "passwordConfirmation") => {
    if (field === "password") {
      setIsShowPasswordText(!isShowPasswordText);
    } else {
      setIsShowConfirmPasswordText(!isShowConfirmPasswordText);
    }
  };

  // 모든 비밀번호 조건이 충족되었는지 확인
  const isPasswordValid =
    passwordValidation.isLengthValid && isPasswordSame === "same";

  // 닉네임 유효성 검사
  const isNicknameValid = (nickname: string): boolean => {
    return nickname.length > 0;
  };

  return {
    email,
    emailError,
    isEmailValid,
    handleEmailChange,
    nickname,
    handleNicknameChange,
    isNicknameValid,
    inputPassword,
    passwordError,
    isShowPasswordText,
    isShowConfirmPasswordText,
    isPasswordSame,
    passwordValidation,
    isPasswordValid,
    handleInputPw,
    handleIsShowPassword,
  };
};
