import { colorChips } from "@/shared/styles/colorChips";
import {
  Stack,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";

interface InputBoxProps extends Omit<TextFieldProps, "variant"> {
  placeholder?: string;
  height?: string;
  value: string;
  isError?: boolean;
  endAdornment?: React.ReactNode;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CommonInput = ({
  isError = false,
  height = "56px",
  placeholder,
  value,
  endAdornment,
  onChange,
  maxLength = 100,
  ...props
}: InputBoxProps) => {
  const textFieldSx = inputSlotSx(isError);

  return (
    <TextField
      autoComplete="off"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fullWidth
      inputProps={{
        maxLength: maxLength,
      }}
      InputProps={{
        sx: {
          height: height || "56px",
        },
        endAdornment: endAdornment ? (
          <Stack sx={endAdornmentSx}>{endAdornment}</Stack>
        ) : null, // endAdornment가 있을 때만 표시
      }}
      sx={textFieldSx}
      {...props}
    />
  );
};

const endAdornmentSx: SxProps = {
  position: "absolute",
  right: "16px",
  top: "50%",
  transform: "translateY(-50%)",
};

const inputSlotSx = (isError: boolean): SxProps<Theme> => {
  return {
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
    borderRadius: "12px",
    background: colorChips.gray100,
    "& .MuiInputBase-input": {
      fontFamily: "pretendard",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "150%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    // placeholder 폰트 스타일
    "& .MuiInputBase-input::placeholder": {
      fontFamily: "pretendard",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "150%",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&::placeholder": {
      color: "#9CA3AF",
      opacity: 1,
    },
    "& .MuiOutlinedInput-root": {
      border: isError
        ? `1px solid ${colorChips.error}`
        : "1px solid transparent",
      "&:hover": {
        border: `1px solid ${
          isError ? colorChips.error : colorChips.primary100
        }`,
      },
      "&.Mui-focused": {
        border: `1px solid ${
          isError ? colorChips.error : colorChips.primary100
        }`,
      },
      borderRadius: "12px",
      backgroundColor: colorChips.gray100,
    },
  };
};
