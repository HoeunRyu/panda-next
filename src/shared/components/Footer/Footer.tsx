import { FooterLink } from "./ui/FooterLink";
import { FooterSns } from "./ui/FooterSns";
import { Typo } from "../../Typo/Typo";
import { colorChips } from "../../styles/colorChips";
import { Box, Stack } from "@mui/material";
export interface SnsLinkList {
  snsName: string;
  href: string;
  src: string;
}

const SNS_LINK_LIST: SnsLinkList[] = [
  {
    snsName: "페이스북",
    href: "https://www.facebook.com/",
    src: "/assets/facebook_icon.png",
  },
  {
    snsName: "트위터",
    href: "https://x.com/",
    src: "/assets/twitter_icon.png",
  },
  {
    snsName: "유튜브",
    href: "https://www.youtube.com/",
    src: "/assets/youtube_icon.png",
  },
  {
    snsName: "인스타그램",
    href: "https://www.instagram.com/",
    src: "/assets/insta_icon.png",
  },
];

export function Footer() {
  return (
    <Stack sx={footerStyles}>
      <Stack sx={footerContentStyles}>
        <Box sx={{ gridArea: "addr" }}>
          <Typo
            className={"text16Regular"}
            color={colorChips.gray400}
            content="©codeit - 2024"
          />
        </Box>

        <Box sx={{ gridArea: "link" }}>
          <FooterLink />
        </Box>

        <Box sx={{ gridArea: "sns" }}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            gap={"12px"}
          >
            {SNS_LINK_LIST.map((sns, idx) => (
              <FooterSns sns={sns} key={idx} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}

const footerStyles = {
  width: "100%",
  height: "160px",
  backgroundColor: colorChips.gray900,
  padding: "32px 0",
};

const footerContentStyles = {
  display: { xs: "grid", sm: "flex" },
  gridTemplateAreas: {
    xs: '"link sns" "addr ."',
    sm: '"addr link sns"',
  },
  rowGap: "24px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "1440px",
  margin: "0 auto",
  padding: { xs: "0 16px", sm: "0 24px" },
  color: colorChips.gray400,
};
