"use client";

import { useDefaultImg } from "@/shared/hooks/useDefaultImg";
import { formatDate } from "@/shared/utils/getFormattedDate";
import { colorChips } from "@/shared/styles/colorChips";
import { Article } from "@/shared/type";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import Image from "next/image";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const nickname = article.ownerNickname;
  const formattedDate = formatDate(article.createdAt);
  const formattedImage = article.image
    ? `https://panda-prisma.onrender.com${article.image}`
    : "";
  const defaultImg = "/assets/default_item.png";
  const { imgSrc, handleImgErr } = useDefaultImg(formattedImage, defaultImg);

  return (
    <Stack sx={articleCardStyle}>
      <Stack sx={descStyle}>
        <Typo
          className="text18Semibold"
          content={article.title}
          color={colorChips.gray800}
        />
        <Image
          src={imgSrc}
          alt="article image"
          width={72}
          height={72}
          style={articleImgStyle}
          onError={handleImgErr}
        />
      </Stack>
      <Stack sx={articleProfileStyle}>
        <Stack direction="row" alignItems="center" gap="8px">
          <Image
            src="/assets/default_profile.png"
            alt="profile image"
            width={24}
            height={24}
          />
          <Typo
            className="text14Regular"
            content={nickname}
            color={colorChips.gray600}
          />
          <Typo
            className="text14Regular"
            content={formattedDate}
            color={colorChips.gray400}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap="4px">
          <Image
            src={
              article.isLiked
                ? "/assets/ic_heart_pink.svg"
                : "/assets/ic_heart_gray5.svg"
            }
            alt="heart icon"
            width={16}
            height={16}
          />
          <Typo
            className="text14Regular"
            content={article.likeCount.toString()}
            color={colorChips.gray500}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const articleCardStyle = {
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "16px",
  cursor: "pointer",
  backgroundColor: "#FCFCFC",
};

const descStyle = {
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
};

const articleImgStyle = {
  borderRadius: "6px",
  border: `1px solid ${colorChips.gray200}`,
  objectFit: "cover",
} as const;

const articleProfileStyle = {
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
} as const;
