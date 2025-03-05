import Link from "next/link";
import { Typo } from "../../../Typo/Typo";
import { colorChips } from "@/shared/styles/colorChips";
import { Stack } from "@mui/material";
export function FooterLink() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={"30px"}
    >
      {/* TODO: 링크 수정하기 ["/privacy", "/faq"] */}
      <Link className="link-item" href="/" style={{ textDecoration: "none" }}>
        <Typo
          className={"text16Regular"}
          color={colorChips.gray200}
          content="Privacy Policy"
        />
      </Link>
      <Link className="link-item" href="/" style={{ textDecoration: "none" }}>
        <Typo
          className={"text16Regular"}
          color={colorChips.gray200}
          content="FAQ"
        />
      </Link>
    </Stack>
  );
}
