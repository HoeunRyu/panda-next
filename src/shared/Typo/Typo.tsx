import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { typographyStyles } from "./TypoStyles";
import "./Typo.css";

export type TypoClassName =
  | "text32Bold"
  | "text32Semibold"
  | "text24Bold"
  | "text24Semibold"
  | "text24Medium"
  | "text24Regular"
  | "text20Bold"
  | "text20Semibold"
  | "text20Medium"
  | "text20Regular"
  | "text18Bold"
  | "text18Semibold"
  | "text18Medium"
  | "text18Regular"
  | "text16Bold"
  | "text16Semibold"
  | "text16Medium"
  | "text16Regular"
  | "text14Bold"
  | "text14Semibold"
  | "text14Medium"
  | "text14Regular"
  | "text13Semibold"
  | "text13Medium"
  | "text12Semibold"
  | "text12Medium"
  | "text12Regular"
  | "productName"
  | "productPrice";

interface CreateTypographyComponent extends TypographyProps {
  className: TypoClassName;
  content?: string;
  children?: React.ReactNode;
  customStyle?: React.CSSProperties;
}

export const Typo = (props: CreateTypographyComponent) => {
  const { content, className, children, customStyle, ...typographyProps } =
    props;
  const typoType = () => {
    // 기본
    return typographyStyles[className];
  };
  return (
    <Typography
      sx={typoType()}
      style={{
        whiteSpace: "pre-wrap",
        ...customStyle,
      }}
      {...typographyProps}
    >
      {content}
      {children}
    </Typography>
  );
};

// /**
//  * 텍스트 스타일
//  * textSizeWeight: "text-[size] [weight]"
//  *
//  * size 옵션: 3xl, 2xl, xl, 2lg, lg, md, sm, xs
//  * weight 옵션: bold, semibold, medium, regular
//  */
// export const typoStyles = {
//   text3xlBold: "text-3xl bold",
//   text3xlSemibold: "text-3xl semibold",
//   text2xlBold: "text-2xl bold",
//   text2xlSemibold: "text-2xl semibold",
//   text2xlMedium: "text-2xl medium",
//   text2xlRegular: "text-2xl regular",
//   textXlBold: "text-xl bold",
//   textXlSemibold: "text-xl semibold",
//   textXlMedium: "text-xl medium",
//   textXlRegular: "text-xl regular",
//   text2lgBold: "text-2lg bold",
//   text2lgSemibold: "text-2lg semibold",
//   text2lgMedium: "text-2lg medium",
//   text2lgRegular: "text-2lg regular",
//   textLgBold: "text-lg bold",
//   textLgSemibold: "text-lg semibold",
//   textLgMedium: "text-lg medium",
//   textLgRegular: "text-lg regular",
//   textMdBold: "text-md bold",
//   textMdSemibold: "text-md semibold",
//   textMdMedium: "text-md medium",
//   textMdRegular: "text-md regular",
//   textSmSemibold: "text-sm semibold",
//   textSmMedium: "text-sm medium",
//   textXsSemibold: "text-xs semibold",
//   textXsMedium: "text-xs medium",
//   textXsRegular: "text-xs regular",
// } as const;
