import { colorChips } from "@/shared/styles/colorChips";
import { ProductTag } from "@/shared/type";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";

interface ProductDescProps {
  description: string;
  tags: ProductTag[];
}

export const ProductDesc = ({ description, tags }: ProductDescProps) => {
  return (
    <Stack sx={productDescriptionSx}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="8px"
      >
        <Typo
          className="text14Semibold"
          content={"상품 소개"}
          color={colorChips.gray600}
        />
        <Typo
          className="text16Regular"
          content={description}
          color={colorChips.gray800}
          customStyle={{
            width: "100%",
            wordBreak: "keep-all",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        />
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="8px"
      >
        <Typo
          className="text14Semibold"
          content={"상품 태그"}
          color={colorChips.gray600}
        />
        <Stack
          width="100%"
          height="fit-content"
          direction="row"
          alignItems="center"
          gap="8px"
          sx={{ flexWrap: "wrap" }}
        >
          {tags.map((tag, idx) => (
            <Typo
              key={idx}
              className="text16Regular"
              content={`#${tag.tag}`}
              customStyle={{
                backgroundColor: colorChips.gray100,
                color: colorChips.gray800,
                borderRadius: "26px",
                padding: "6px 16px",
                width: "fit-content",
                wordBreak: "keep-all",
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const productDescriptionSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "24px",
  paddingTop: "16px",
  paddingBottom: "40px",
};
