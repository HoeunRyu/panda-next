import { Typo, TypoClassName } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { Button, ButtonProps, CircularProgress } from "@mui/material";

export type ButtonColorType = "primary" | "white";

interface CommonButtonProps extends ButtonProps {
  colorType: ButtonColorType;
  title: string;
  padding?: string;
  textColor?: string;
  textSize?: TypoClassName;
  bgColor?: string;
  borderRadius?: string;
  maxWidth?: string;
  width?: string;
  height?: string;
  fullWidth?: boolean;
  isMobile?: boolean;
  border?: string;
  justifyContent?: "space-between" | "center" | "space-around" | "space-evenly";
  isLoading?: boolean;
}

export const CommonButton = ({
  colorType,
  title,
  width,
  height,
  bgColor,
  fullWidth = false,
  onClick,
  disabled = false,
  borderRadius,
  padding,
  maxWidth,
  isMobile,
  startIcon,
  textColor,
  textSize,
  endIcon,
  border,
  justifyContent = "space-between",
  isLoading = false,
  ...props
}: CommonButtonProps) => {
  const handleTextColor = () => {
    if (textColor) return textColor;
    if (disabled || isLoading) return colorChips.gray100;

    switch (colorType) {
      case "primary":
        return colorChips.gray100;
      case "white":
        return colorChips.primary100;
      default:
        return colorChips.white;
    }
  };

  const handleBgColor = () => {
    if (bgColor) return bgColor;
    if (disabled || isLoading) return colorChips.gray400;

    switch (colorType) {
      case "white":
        return colorChips.white;
      case "primary":
        return colorChips.primary100;
      default:
        return colorChips.primary100;
    }
  };

  return (
    <Button
      fullWidth={fullWidth}
      onClick={onClick}
      endIcon={endIcon}
      disabled={disabled || isLoading}
      sx={{
        whiteSpace: "nowrap",
        maxWidth: maxWidth ? "100%" : maxWidth,
        minWidth: "fit-content",
        width: fullWidth ? "100%" : width,
        height: height,
        padding: padding || "12px 23px",
        bgcolor: handleBgColor(),
        color: handleTextColor(),
        borderRadius: borderRadius || "8px",
        border: border || "none",
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        "&.Mui-disabled": {
          color: handleTextColor(),
        },
        ":hover": {
          bgcolor: isMobile ? handleBgColor() : undefined,
          color: isMobile ? handleTextColor() : undefined,
        },
      }}
      {...props}
    >
      {isLoading ? (
        <CircularProgress size={15} sx={{ color: handleTextColor() }} />
      ) : (
        <Typo
          className={textSize ?? "text16Semibold"}
          content={title}
          customStyle={{
            whiteSpace: "nowrap",
          }}
        />
      )}
    </Button>
  );
};
