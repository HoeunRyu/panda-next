import { Stack, SxProps } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const AuthHeaderLogo = () => {
  const router = useRouter();

  return (
    <Stack sx={authHeaderLogoSx} onClick={() => router.push("/")}>
      <Image src="/assets/logo_img.png" alt="logo" fill objectFit="contain" />
    </Stack>
  );
};

const authHeaderLogoSx: SxProps = {
  position: "relative",
  width: { xs: "198px", sm: "396px" },
  height: { xs: "66px", sm: "132px" },
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  cursor: "pointer",
};
