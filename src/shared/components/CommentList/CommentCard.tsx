import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { FormControl, Input, Stack, Button } from "@mui/material";
import { EditEllipsis } from "@/shared/components/EditEllipsis";
import { getRelativeTimeString } from "@/shared/utils/getFormattedDate";
import Image from "next/image";
import { Comment } from "@/shared/type";
import { CommentType, useCommentActions } from "@/shared/hooks/useCommentHook";
import { useState } from "react";
import { useSnackbarStore } from "@/shared/store/useSnackbarStore";
import { DeleteItemModal } from "../Modal/DeleteItemModal";

interface CommentCardProps {
  data: Comment;
  type: CommentType;
}

export const CommentCard = ({ data, type }: CommentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(data.content);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { writer, content, createdAt, id } = data;
  const { updateComment, deleteComment } = useCommentActions(type);
  const { openSnackbar } = useSnackbarStore();

  const handleUpdate = () => {
    setIsEditing(true);
    setEditContent(content);
  };

  const handleUpdateSubmit = async () => {
    try {
      await updateComment(id, editContent);
      setIsEditing(false);
    } catch (error) {
      openSnackbar("다시 시도해주세요.", "error");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteComment(id);
      openSnackbar("댓글이 삭제되었습니다.", "success");
    } catch (error: any) {
      openSnackbar(error?.response?.data?.message, "error");
    } finally {
      setOpenDeleteModal(false);
    }
  };

  // 프로필 이미지 수정 기능 없어서 다 디폴트 이미지로 처리
  const nickname = writer.nickname;
  const profileImg = "/assets/default_profile.png";
  const formattedDate = getRelativeTimeString(createdAt);

  return (
    <>
      <Stack sx={commentCardSx}>
        <Stack sx={commentCardContentSx}>
          {isEditing ? (
            <Stack sx={editModeSx}>
              <FormControl variant="filled" sx={editInputBoxStyle}>
                <Input
                  disableUnderline
                  placeholder="수정할 내용을 입력해주세요."
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  sx={placeholderStyle}
                />
              </FormControl>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCancel}
                  sx={{
                    backgroundColor: colorChips.white,
                    border: `1px solid ${colorChips.primary100}`,
                  }}
                >
                  <Typo
                    className="text14Semibold"
                    content="취소"
                    customStyle={{ color: colorChips.primary100 }}
                  />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateSubmit}
                  disabled={!editContent.trim()}
                  sx={{
                    backgroundColor: colorChips.primary100,
                  }}
                >
                  <Typo
                    className="text14Semibold"
                    content="수정하기"
                    customStyle={{ color: colorChips.white }}
                  />
                </Button>
              </Stack>
            </Stack>
          ) : (
            <>
              <Typo
                className="text14Regular"
                content={content}
                color={colorChips.gray800}
              />
              <EditEllipsis onUpdate={handleUpdate} onDelete={handleDelete} />
            </>
          )}
        </Stack>
        <Stack sx={userInfoSx}>
          <Image src={profileImg} alt="profile" width={32} height={32} />
          <Stack
            sx={{
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <Typo
              className="text12Medium"
              content={nickname}
              color={colorChips.gray600}
              customStyle={{ whiteSpace: "nowrap" }}
            />
            <Typo
              className="text12Regular"
              content={formattedDate}
              color={colorChips.gray400}
            />
          </Stack>
        </Stack>
      </Stack>
      <DeleteItemModal
        modalTitle="정말로 댓글을 삭제하시겠어요?"
        openModal={openDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        handleClickDelete={handleConfirmDelete}
      />
    </>
  );
};

const commentCardSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "24px",
  paddingBottom: "12px",
  borderBottom: `1px solid ${colorChips.gray200}`,
};

const commentCardContentSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
};

const userInfoSx = {
  width: "100%",
  height: "fit-content",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "8px",
};

const editModeSx = {
  width: "100%",
  gap: 2,
  flexDirection: "column",
  alignItems: "flex-end",
};

const editInputBoxStyle = {
  width: "100%",
  height: "fit-content",
  padding: "16px 24px",
  backgroundColor: colorChips.gray100,
  borderRadius: "12px",
  border: "none",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
};

const placeholderStyle = {
  color: colorChips.gray600,
  fontFamily: "Pretendard",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "22px",
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
