import "./ItemsPage.css";
import { CommonLayout } from "@/shared/layout/CommonLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CommonLayout>{children}</CommonLayout>;
}
