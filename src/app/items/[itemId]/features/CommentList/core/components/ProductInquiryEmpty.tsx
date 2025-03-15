import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import Image from "next/image";

export const ProductInquiryEmpty = () => {
  return (
    <Stack sx={productInquiryEmptySx}>
      <Image
        src="/assets/inquiry_empty_img.svg"
        alt="inquiry-empty"
        width={140}
        height={140}
      />
      <Typo
        className="text16Regular"
        content="아직 문의가 없어요"
        color={colorChips.gray400}
      />
    </Stack>
  );
};

const productInquiryEmptySx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
