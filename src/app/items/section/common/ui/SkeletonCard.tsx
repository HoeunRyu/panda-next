import Image from "next/image";
import "./SkeletonCard.css";
import { Stack, Skeleton } from "@mui/material";

export function SkeletonCard({
  variant = "all",
}: {
  variant?: "best" | "all";
}) {
  return (
    <Stack
      width="100%"
      height="fit-content"
      direction="column"
      gap="16px"
      sx={{
        ...(variant === "best" ? bestItemCardSx : allItemCardSx),
      }}
    >
      <Stack sx={skeletonImgSx}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: "20px",
          }}
        />
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        // gap="4px"
      >
        <Skeleton variant="text" width="70%" height={28} />
        <Skeleton variant="text" width="40%" height={28} />
        <Stack direction="row" alignItems="center" gap="4px">
          <Image
            src={"/assets/favorite_heart.png"}
            alt="좋아요 아이콘"
            width={16}
            height={16}
          />
          <Skeleton variant="text" width={24} height={20} />
        </Stack>
      </Stack>
    </Stack>
  );
}

const skeletonImgSx = {
  width: "100%",
  position: "relative",
  "&::before": {
    content: '""',
    display: "block",
    paddingTop: "100%", // 1:1 비율
  },
};

const bestItemCardSx = {
  "@media (min-width: 1024px)": {
    // 데스크탑
    width: "282px",
    height: "378px",
  },
  "@media (max-width: 1023px)": {
    // 태블릿, 모바일
    width: "343px",
    height: "434px",
  },
};

const allItemCardSx = {
  "@media (min-width: 768px)": {
    // 데스크탑, 태블릿
    width: "221px",
    height: "317px",
  },
  "@media (max-width: 767px)": {
    // 모바일
    width: "168px",
    height: "264px",
  },
};
