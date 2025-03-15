import { Stack, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
  const isMobile = useMediaQuery("(max-width:744px)");

  return (
    <Link href="/">
      {/*  모바일 사이즈에서 텍스트만 보이기위해 아이콘/텍스트 분리해서 넣음 */}
      <Stack sx={logoStyles}>
        {!isMobile && (
          <Image
            src={"/assets/logo_icon.png"}
            alt="로고 이미지"
            width={40}
            height={40}
          />
        )}
        <Stack sx={logoTextStyles}>
          <Image
            src={"/assets/logo_text.png"}
            alt="로고 텍스트"
            fill
            style={{ objectFit: "contain", position: "absolute" }}
          />
        </Stack>
      </Stack>
    </Link>
  );
}

const logoStyles = {
  width: "100%",
  height: "51px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8.6px",
};

const logoTextStyles = {
  width: { xs: "81px", sm: "103px" },
  height: { xs: "40px", sm: "50px" },
  position: "relative",
};
