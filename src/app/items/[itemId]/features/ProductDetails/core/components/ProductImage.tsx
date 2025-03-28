import { useDefaultImg } from "@/shared/hooks/useDefaultImg";
import { Stack } from "@mui/material";

export const ProductImage = ({ images }: { images: string[] }) => {
  const formattedImage = images[0]
    ? `https://panda-prisma.onrender.com${images[0]}`
    : "";
  const defaultItemImg = "/assets/default_item.png";
  const { imgSrc, handleImgErr } = useDefaultImg(
    formattedImage,
    defaultItemImg
  );

  return (
    <Stack sx={productImageContainerSx}>
      <Stack sx={productImageWrapperSx}>
        <img
          src={imgSrc}
          alt="product"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "16px",
          }}
          onError={handleImgErr}
        />
      </Stack>
    </Stack>
  );
};

const productImageContainerSx = {
  width: "100%",
  maxWidth: { xs: "100%", sm: "340px", md: "486px" },
} as const;

const productImageWrapperSx = {
  width: "100%",
  position: "relative",
  paddingBottom: "100%", // 1:1 비율 유지
} as const;
