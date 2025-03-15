import "./ItemCard.css";
import Link from "next/link";
import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { CodeitProduct } from "@/shared/types/codeitApiType";
import React from "react";
import Image from "next/image";
import { Stack } from "@mui/material";
import { useDefaultImg } from "@/shared/hooks/useDefaultImg";

export function ItemCard({
  product,
  variant = "all",
}: {
  product: CodeitProduct;
  variant?: "best" | "all";
}): React.ReactElement {
  const {
    id,
    images: [productImg], //반환된 배열에서 첫번째 링크 대표 이미지로 사용
    name,
    price,
    favoriteCount,
  } = product;

  const defaultItemImg = "/assets/default_item.png";
  const { imgSrc, handleImgErr } = useDefaultImg(productImg, defaultItemImg);

  const formattedPrice = `${new Intl.NumberFormat("ko-KR").format(price)}원`;

  return (
    <Link href={`/items/${id}`} style={{ textDecoration: "none" }}>
      <Stack
        width="100%"
        height="fit-content"
        direction="column"
        gap="16px"
        sx={{
          ...(variant === "best" ? bestItemCardSx : allItemCardSx),
        }}
      >
        <Stack sx={itemCardImgSx}>
          <img
            src={imgSrc}
            alt="대표 이미지"
            onError={handleImgErr}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
              position: "absolute",
            }}
          />
        </Stack>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          gap="6px"
        >
          <Typo
            className={"text14Medium"}
            color={colorChips.gray800}
            content={name}
          />
          <Typo
            className={"text16Bold"}
            color={colorChips.gray800}
            content={formattedPrice}
          />
          <Stack direction="row" alignItems="center" gap="4px">
            <Image
              src={"/assets/favorite_heart.png"}
              alt="좋아요 아이콘"
              width={16}
              height={16}
            />
            <Typo
              className={"text12Medium"}
              content={favoriteCount.toString()}
              color={colorChips.gray600}
            />
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
}

const itemCardImgSx = {
  width: "100%",
  position: "relative",
  "&::before": {
    content: '""',
    display: "block",
    paddingTop: "100%", // 1:1 비율
  },
};

const bestItemCardSx = {
  "@media (min-width: 1200px)": {
    // 데스크탑
    width: "282px",
    height: "378px",
  },
  "@media (max-width: 1200px)": {
    // 태블릿, 모바일
    width: "343px",
    height: "434px",
  },
};

const allItemCardSx = {
  "@media (min-width: 744px)": {
    // 데스크탑, 태블릿
    width: "221px",
    height: "317px",
  },
  "@media (max-width: 744px)": {
    // 모바일
    width: "168px",
    height: "264px",
  },
};
