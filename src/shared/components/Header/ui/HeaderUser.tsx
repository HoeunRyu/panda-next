import React from "react";
import { colorChips } from "@/shared/styles/colorChips";
import { Stack, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/shared/store/useUserStore";
import { CommonButton } from "../../Buttons/CommonButton";
import { useDefaultImg } from "@/shared/hooks/useDefaultImg";
import { Typo } from "@/shared/Typo/Typo";

export const HeaderUser = () => {
  const isDesktop = useMediaQuery("(min-width: 744px)");
  const { userInfo, isAuthenticated } = useUserStore();
  const router = useRouter();

  const defaultUserProfile = "/assets/default_profile.png";
  const { imgSrc, handleImgErr } = useDefaultImg(
    userInfo?.image,
    defaultUserProfile
  );

  const handleClickLoginBtn = () => {
    router.push("/login");
  };

  if (!isAuthenticated) {
    return (
      <CommonButton
        colorType="primary"
        textColor={colorChips.gray100}
        title="로그인"
        borderRadius="8px"
        width="fit-content"
        height="42px"
        padding="12px 23px"
        onClick={handleClickLoginBtn}
      />
    );
  }

  return (
    <Stack direction="row" alignItems="center" gap={"6px"}>
      <Stack sx={profileImgSx}>
        <img
          src={imgSrc}
          alt="프로필 사진"
          width={40}
          height={40}
          onError={handleImgErr}
          style={{ objectFit: "cover" }}
        />
      </Stack>
      {/* PC 화면에서만 닉네임 추가 */}
      {isDesktop && (
        <Typo
          className="text18Regular"
          color={colorChips.gray600}
          content={userInfo?.nickname}
        />
      )}
    </Stack>
  );
};

const profileImgSx = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: `1px solid ${colorChips.gray200}`,
};
