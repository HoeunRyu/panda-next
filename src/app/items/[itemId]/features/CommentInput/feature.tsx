import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import {
  Button,
  CircularProgress,
  FormControl,
  InputBase,
  Stack,
} from "@mui/material";
import { useCodeitProductCommentInput } from "../../core/hooks/useProductCommentQuery";

interface CommentInputProps {
  itemId: string;
}

export const CommentInput = ({ itemId }: CommentInputProps) => {
  const {
    content,
    isLoading,
    handleContentChange,
    handleBlur,
    handleKeyDown,
    postComment,
    isDisabled,
  } = useCodeitProductCommentInput(itemId);

  const commentInputLabel = "문의하기";
  const commentInputPlaceholder =
    "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

  return (
    <Stack sx={commentInputSx}>
      <Typo
        className="text16Semibold"
        content={commentInputLabel}
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
              placeholder={commentInputPlaceholder}
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
            "&.Mui-disabled": {
              backgroundColor: colorChips.gray400,
            },
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
