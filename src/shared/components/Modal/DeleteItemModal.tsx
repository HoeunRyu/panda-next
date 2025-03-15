"use client";

import { Stack, Modal, Button } from "@mui/material";
import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "../../styles/colorChips";
import Image from "next/image";

interface DeleteItemModalProps {
  modalTitle: string;
  openModal: boolean;
  handleClickDelete: () => void;
  handleCloseModal: () => void;
}

export const DeleteItemModal = ({
  modalTitle,
  openModal,
  handleCloseModal,
  handleClickDelete,
}: DeleteItemModalProps) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="delete-item-modal"
      sx={{
        zIndex: 10000,
        marginX: "20px",
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
        "& :focus": {
          outline: `1px solid ${colorChips.white} !important`,
        },
      }}
    >
      <Stack sx={deleteItemModalSx}>
        <Stack sx={modalContentsSx}>
          <Image
            src="/assets/ic_delete_check.svg"
            alt="alert"
            width={24}
            height={24}
          />
          <Typo
            content={modalTitle}
            className="text16Medium"
            color={colorChips.gray800}
            customStyle={{
              textAlign: "center",
            }}
          />
        </Stack>
        <Stack sx={modalButtonsSx}>
          <Button type="button" sx={cancelBtnSx} onClick={handleCloseModal}>
            <Typo
              content="취소"
              className="text16Medium"
              color={colorChips.error}
            />
          </Button>
          <Button type="button" sx={deleteBtnSx} onClick={handleClickDelete}>
            <Typo
              content="네"
              className="text16Medium"
              color={colorChips.white}
            />
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

const deleteItemModalSx = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: colorChips.white,
  borderRadius: "12px",
  boxShadow: 24,
  p: "24px",
  width: "298px",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "32px",
} as const;

const modalContentsSx = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
} as const;

const modalButtonsSx = {
  width: "100%",
  height: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
} as const;

const modalBtnBaseSx = {
  width: "84px",
  height: "48px",
  padding: "12px 23px",
  borderRadius: "8px",
  cursor: "pointer",
} as const;

const cancelBtnSx = {
  ...modalBtnBaseSx,
  bgcolor: colorChips.white,
  color: colorChips.error,
  border: `1px solid ${colorChips.error}`,
  "&:hover": {
    bgcolor: colorChips.white,
    color: colorChips.error,
  },
} as const;

const deleteBtnSx = {
  ...modalBtnBaseSx,
  bgcolor: colorChips.error,
  color: colorChips.white,
  "&:hover": {
    bgcolor: colorChips.error,
    color: colorChips.white,
  },
} as const;
