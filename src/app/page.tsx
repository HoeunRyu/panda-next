"use client";

import LandingPage from "./landing/page";
import { CommonLayout } from "@/shared/layout/CommonLayout";

export default function Home() {
  return (
    <CommonLayout>
      <LandingPage />
    </CommonLayout>
  );
}
