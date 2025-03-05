import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import { BestCard } from "./core/components/BestCard";
import { ScreenSizeType } from "@/shared/type";
import { useMediaQuery } from "@/shared/hooks/mediaQueryHook";
import { useBestArticles } from "../../core/hooks/useArticleListQuery";
import { useRouter } from "next/navigation";
//sizeConfig
const SCREEN_SIZES_TO_LIMIT: {
  MOBILE: number;
  TABLET: number;
  DESKTOP: number;
} = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
};

export const BestArticles = () => {
  const router = useRouter();
  const screenSize: ScreenSizeType = useMediaQuery();
  const limit: number = SCREEN_SIZES_TO_LIMIT[screenSize];

  const { articles, isLoading } = useBestArticles(limit);

  const handleClickArticle = (articleId: string) => {
    router.push(`/freeboard/${articleId}`);
  };

  return (
    <Stack sx={bestArticlesStyle}>
      <Typo
        className="text20Bold"
        content="베스트 게시글"
        color={colorChips.gray900}
      />
      <Stack sx={bestArticleListStyle}>
        {articles.map((article) => (
          <BestCard
            key={article.id}
            article={article}
            isLoading={isLoading}
            onClick={() => handleClickArticle(article.id.toString())}
          />
        ))}
      </Stack>
    </Stack>
  );
};

const bestArticlesStyle = {
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: { xs: "16px", sm: "24px" },
};

const bestArticleListStyle = {
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: { xs: "16px", sm: "24px" },
};
