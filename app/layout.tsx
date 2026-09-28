import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "光厘｜大学生摄影 AI 优化平台", template: "%s｜光厘" },
  description: "面向高校学生的原创摄影 AI 优化、校园作品展示与取景灵感平台。",
  keywords: ["大学生摄影", "AI 修图", "校园摄影", "光厘", "摄影社区"],
  openGraph: {
    title: "光厘｜把校园里的光，修成你想要的样子",
    description: "一键优化校园摄影作品，保留真实光影与自然质感。",
    type: "website",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0907" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}