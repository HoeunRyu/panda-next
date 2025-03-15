import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Stack } from "@mui/material";

export const InputErrorMsg = ({ message }: { message: string }) => {
  return (
    <Stack direction="row" alignItems="center" padding="8px 16px 0">
      <Typo
        className="text14Semibold"
        color={colorChips.error}
        content={message}
      />
    </Stack>
  );
};
