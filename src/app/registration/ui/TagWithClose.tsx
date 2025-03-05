import { colorChips } from "@/shared/styles/colorChips";
import "./TagWithClose.css";
import { Typo } from "@/shared/Typo/Typo";
import React from "react";
import { TagWithCloseProps } from "../type";

export const TagWithClose: React.FC<TagWithCloseProps> = ({
  tag,
  deleteTag,
}) => {
  return (
    <div className="tag-chips">
      <Typo
        className={"text16Regular"}
        color={colorChips.gray800}
        content={`#${tag}`}
      />
      <img
        className="tag-delete-icon"
        src={"/assets/chip_delete_icon.png"}
        onClick={() => deleteTag(tag)}
        alt="태그 삭제 버튼"
      />
    </div>
  );
};
