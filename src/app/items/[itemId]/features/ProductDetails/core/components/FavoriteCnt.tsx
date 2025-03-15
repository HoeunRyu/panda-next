import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";
import Image from "next/image";

interface FavoriteCntProps {
  isFavorite: boolean;
  favoriteCount: number;
  onToggleFavorite: () => void;
}

export const FavoriteCnt = ({
  isFavorite,
  favoriteCount,
  onToggleFavorite,
}: FavoriteCntProps) => {
  return (
    <Stack
      sx={{
        width: "fit-content",
        height: "fit-content",
        paddingLeft: "24px",
        borderLeft: `1px solid ${colorChips.gray200}`,
      }}
    >
      <Stack sx={favoriteCountSx} onClick={onToggleFavorite}>
        <Image
          src={
            isFavorite
              ? "/assets/ic_heart_pink.svg"
              : "/assets/ic_heart_gray5.svg"
          }
          alt="favorite"
          width={24}
          height={24}
          style={{ cursor: "pointer" }}
        />
        <Typo
          className="text16Medium"
          content={favoriteCount.toString()}
          color={colorChips.gray500}
        />
      </Stack>
    </Stack>
  );
};

const favoriteCountSx = {
  width: "fit-content",
  height: "fit-content",
  borderRadius: "35px",
  border: `1px solid ${colorChips.gray200}`,
  padding: "4px 12px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
};
