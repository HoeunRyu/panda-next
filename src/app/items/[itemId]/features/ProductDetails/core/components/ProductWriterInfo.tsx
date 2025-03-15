import { Typo } from "@/shared/Typo/Typo";

import { colorChips } from "@/shared/styles/colorChips";
import { Stack } from "@mui/material";
import Image from "next/image";
import { FavoriteCnt } from "./FavoriteCnt";

interface ProductBottomProps {
  defaultProfileImg: string;
  ownerNickname: string;
  formattedDate: string;
  favoriteCount: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ProductWriterInfo = ({
  defaultProfileImg,
  ownerNickname,
  formattedDate,
  favoriteCount,
  isFavorite,
  onToggleFavorite,
}: ProductBottomProps) => {
  return (
    <Stack sx={productBottomSx}>
      <Stack sx={userInfoSx}>
        <Image src={defaultProfileImg} alt="profile" width={40} height={40} />
        <Stack
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "2px",
          }}
        >
          <Typo
            className="text14Medium"
            content={ownerNickname}
            color={colorChips.gray600}
            customStyle={{ width: "100%", whiteSpace: "nowrap" }}
          />
          <Typo
            className="text14Regular"
            content={formattedDate}
            color={colorChips.gray400}
            customStyle={{ width: "100%", whiteSpace: "nowrap" }}
          />
        </Stack>
      </Stack>
      <FavoriteCnt
        isFavorite={isFavorite}
        favoriteCount={favoriteCount}
        onToggleFavorite={onToggleFavorite}
      />
    </Stack>
  );
};

const productBottomSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
};

const userInfoSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "row",
  alignItems: "center",
  gap: "16px",
};
