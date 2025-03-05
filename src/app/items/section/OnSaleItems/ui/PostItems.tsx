import Link from "next/link";
import { Typo } from "@/shared/Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";

export function PostItems() {
  return (
    <Link id="post-item-btn" href="/registration">
      <Typo
        className={"text16Semibold"}
        color={colorChips.gray100}
        content="상품 등록하기"
      />
    </Link>
  );
}
