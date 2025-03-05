import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import {
  Button,
  CircularProgress,
  FormControl,
  InputBase,
  Stack,
} from "@mui/material";
import { useCommentInput } from "@/shared/hooks/useCommentHook";

interface CommentInputProps {
  itemId: string;
  type: "articles" | "products";
  inputLabel: string;
  placeholder: string;
}

export const CommentInput = ({
  itemId,
  type,
  inputLabel,
  placeholder,
}: CommentInputProps) => {
  const {
    content,
    isLoading,
    handleContentChange,
    handleBlur,
    handleKeyDown,
    postComment,
    isDisabled,
  } = useCommentInput(itemId, type);

  return (
    <Stack sx={commentInputSx}>
      <Typo
        className="text16Semibold"
        content={inputLabel}
        color={colorChips.gray900}
      />
      <Stack sx={commentInputContainerSx}>
        <Stack sx={{ width: "100%" }}>
          <FormControl variant="filled" sx={contentInputBoxStyle}>
            <InputBase
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              sx={placeholderStyle}
            />
          </FormControl>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          disabled={isDisabled}
          onClick={() => postComment()}
          sx={{
            ...commentInputButtonSx,
            backgroundColor: isDisabled
              ? colorChips.gray400
              : colorChips.primary100,
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <Typo
              className="text16Semibold"
              content={"등록"}
              color={colorChips.gray100}
            />
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

const commentInputSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  paddingBottom: "40px",
};

const commentInputContainerSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "flex-start",
  gap: "16px",
};

const commentInputButtonSx = {
  width: "fit-content",
  height: "42px",
  padding: "12px 23px",
  borderRadius: "8px",
  backgroundColor: colorChips.primary100,
};

const contentInputBoxStyle = {
  width: "100%",
  height: "fit-content",
  minHeight: "104px",
  padding: "16px 24px",
  backgroundColor: colorChips.gray100,
  borderRadius: "12px",
  border: "none",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  "& .MuiInputBase-input": {
    padding: 0,
    margin: 0,
  },
};

const placeholderStyle = {
  color: colorChips.gray600,
  fontFamily: "Pretendard",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "26px",
  flex: 1,
  wordBreak: "break-word",
  "& .MuiInputBase-input": {
    padding: "10px 0",
    overflowY: "auto",
  },
  border: "none",
  padding: 0,
  margin: 0,
};
