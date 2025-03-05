import React from "react";
import { SnsLinkList } from "../Footer";
import Link from "next/link";
import Image from "next/image";
interface FooterSnsProps {
  sns: SnsLinkList;
}

export const FooterSns: React.FC<FooterSnsProps> = ({ sns }) => {
  const alt: string = `${sns.snsName} 링크`;

  return (
    <Link href={sns.href} target="_blank" rel="noopener noreferrer">
      <Image
        src={sns.src}
        alt={alt}
        width={20}
        height={20}
        style={{ cursor: "pointer" }}
      />
    </Link>
  );
};
