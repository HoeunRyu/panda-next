import { SxProps } from "@mui/material";

import { Link } from "@mui/material";
import { Stack } from "@mui/material";
import { Typo } from "../../Typo/Typo";
import { colorChips } from "../../styles/colorChips";
import Image from "next/image";

export const SocialAuth = () => {
  return (
    <Stack sx={socialAuthSx}>
      <Typo
        className="text16Medium"
        color={colorChips.gray800}
        content="간편 로그인하기"
        customStyle={{ whiteSpace: "nowrap" }}
      />
      <Stack width="fit-content" direction="row" alignItems="center" gap="16px">
        <Link href="https://www.google.com" target="_blank">
          <Image
            src={"/assets/auth_google.svg"}
            alt="google"
            width={42}
            height={42}
          />
        </Link>
        <Link href="https://www.kakaocorp.com/page" target="_blank">
          <Image
            src={"/assets/auth_kakao.svg"}
            alt="kakao"
            width={42}
            height={42}
          />
        </Link>
      </Stack>
    </Stack>
  );
};

const socialAuthSx: SxProps = {
  width: "100%",
  height: "74px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "16px 23px",
  borderRadius: "8px",
  backgroundColor: "#E6F2FF",
};
