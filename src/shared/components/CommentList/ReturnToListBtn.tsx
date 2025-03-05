import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Button, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ReturnToListBtnProps {
  returnUrl: string;
}

export const ReturnToListBtn = ({ returnUrl }: ReturnToListBtnProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(returnUrl);
  };

  return (
    <Stack sx={returnToListBtnContainerSx}>
      <Button
        variant="contained"
        color="primary"
        disabled={false}
        onClick={handleClick}
        sx={returnToListBtnSx}
      >
        <Typo
          className="text18Semibold"
          content={"목록으로 돌아가기"}
          color={colorChips.gray100}
        />
        <Image
          src="/assets/ic_back.svg"
          alt="arrow-left"
          width={24}
          height={24}
        />
      </Button>
    </Stack>
  );
};

const returnToListBtnContainerSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};

const returnToListBtnSx = {
  width: "fit-content",
  height: "48px",
  borderRadius: "40px",
  backgroundColor: colorChips.primary100,
  padding: "11px 40px",
  marginTop: "40px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};
