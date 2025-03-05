import { colorChips } from "@/shared/styles/colorChips";
import { Typo } from "@/shared/Typo/Typo";
import { Collapse, Stack } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface EditEllipsisProps {
  onUpdate: () => void;
  onDelete: () => void;
}

export const EditEllipsis = ({ onUpdate, onDelete }: EditEllipsisProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpdate = () => {
    onUpdate();
    setIsExpanded(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsExpanded(false);
  };

  return (
    <Stack sx={editEllipsisContainerStyle}>
      <Image
        src="/assets/ic_kebab.svg"
        alt="edit"
        width={24}
        height={24}
        onClick={handleToggle}
      />
      <Collapse in={isExpanded} sx={editCollapseStyle}>
        <Stack
          onClick={handleUpdate}
          sx={{
            ...dropdownOptSx,
            borderBottom: `1px solid ${colorChips.gray200}`,
          }}
        >
          <Typo
            className="text14Regular"
            content="수정하기"
            color={colorChips.gray500}
            customStyle={{
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          />
        </Stack>
        <Stack onClick={handleDelete} sx={dropdownOptSx}>
          <Typo
            className="text14Regular"
            content="삭제하기"
            color={colorChips.gray500}
            customStyle={{
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          />
        </Stack>
      </Collapse>
    </Stack>
  );
};

const editEllipsisContainerStyle = {
  width: "24px",
  height: "24px",
  position: "relative",
  cursor: "pointer",
};

const editCollapseStyle = {
  position: "absolute",
  top: "24px",
  right: "0",
  width: "fit-content",
  height: "fit-content",
  backgroundColor: colorChips.white,
  borderRadius: "8px",
  border: `1px solid ${colorChips.gray300}`,
  boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.10)",
  zIndex: 1000,
};

const dropdownOptSx = {
  width: "fit-content",
  height: "fit-content",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: { xs: "16px 26.5px 12px", sm: "16px 41.5px 12px" },
  cursor: "pointer",
};
