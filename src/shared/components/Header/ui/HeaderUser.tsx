import Link from "next/link";
import { Typo } from "../../../Typo/Typo";
import React from "react";
import { colorChips } from "@/shared/styles/colorChips";
import { Button, Stack } from "@mui/material";
import Image from "next/image";

interface HeaderUserProps {
  isLoggedIn: boolean;
  handleClick: () => void;
}

export const HeaderUser: React.FC<HeaderUserProps> = ({
  isLoggedIn,
  handleClick,
}) => {
  return (
    <Stack sx={{ flexShrink: 0 }} onClick={handleClick}>
      {/* TODO: 현재 버튼 클릭할떄마다 프로필이미지/로그인버튼 전환되는 상태 */}
      {isLoggedIn ? (
        <Image
          src={"/assets/default_profile.png"}
          alt="프로필 사진"
          width={40}
          height={40}
        />
      ) : (
        // TODO: 링크 수정하기 "/login"
        <Link id="login-btn" href="/">
          <Button variant="contained" sx={loginBtnStyle}>
            <Typo
              className={"text16Semibold"}
              color={colorChips.gray100}
              content="로그인"
            />
          </Button>
        </Link>
      )}
    </Stack>
  );
};

const loginBtnStyle = {
  width: "100%",
  height: "42px",
  backgroundColor: colorChips.primary100,
  borderRadius: "8px",
  padding: "12px 23px",
  border: "none",
};
