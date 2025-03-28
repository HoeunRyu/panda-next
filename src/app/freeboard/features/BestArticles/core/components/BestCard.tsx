"use client";

import { useDefaultImg } from "@/shared/hooks/useDefaultImg";
import { formatDate } from "@/shared/utils/getFormattedDate";
import { colorChips } from "@/shared/styles/colorChips";
import { Article } from "@/shared/type";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import Image from "next/image";

interface BestCardProps {
  article: Article;
  isLoading: boolean;
  onClick: () => void;
}

export const BestCard = ({ article, isLoading, onClick }: BestCardProps) => {
  const nickname = article.ownerNickname;
  const formattedDate = formatDate(article.createdAt);
  const formattedImage = article.image
    ? `https://panda-prisma.onrender.com${article.image}`
    : "";
  const defaultImg = "/assets/default_item.png";
  const { imgSrc, handleImgErr } = useDefaultImg(formattedImage, defaultImg);

  return (
    <Stack sx={bestCardStyle} onClick={onClick}>
      <Stack sx={bestLabelStyle}>
        <Image
          src="/assets/best_icon.svg"
          alt="best medal"
          width={16}
          height={16}
        />
        <Typo className="text16Semibold" content="Best" color="#FFFFFF" />
      </Stack>
      <Stack sx={ContentWrapperStyle}>
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
        <Stack sx={articleInfoStyle}>
          <Stack direction="row" alignItems="center" gap="8px">
            <Typo
              className="text14Regular"
              content={nickname}
              color={colorChips.gray600}
            />
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
          <Typo
            className="text14Regular"
            content={formattedDate}
            color={colorChips.gray400}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const bestCardStyle = {
  width: "100%",
  maxWidth: "384px",
  height: "100%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "16px",
  paddingX: "24px",
  paddingBottom: "16px",
  cursor: "pointer",
  backgroundColor: colorChips.gray50,
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: colorChips.gray100,
  },
} as const;

const bestLabelStyle = {
  width: "102px",
  height: "30px",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  backgroundColor: colorChips.primary100,
  borderRadius: "0 0 16px 16px",
};

const ContentWrapperStyle = {
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: { xs: "40px", md: "18px" },
};

const descStyle = {
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "8px",
};

const articleImgStyle = {
  borderRadius: "6px",
  border: `1px solid ${colorChips.gray200}`,
  objectFit: "cover",
} as const;

const articleInfoStyle = {
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
} as const;
