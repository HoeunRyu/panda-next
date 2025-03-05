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
        <Image
          src={"/assets/logo_text.png"}
          alt="로고 텍스트"
          width={103}
          height={50}
          style={{ width: "auto", height: "auto" }}
        />
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
