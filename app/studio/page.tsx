import type { Metadata } from "next";
import { EnhanceStudio } from "@/components/enhance-studio";

export const metadata: Metadata = { title: "AI 修图工作台" };

export default function StudioPage() {
  return (
    <div className="shell studio-page">
      <header className="studio-heading">
        <div><p className="eyebrow">AI photo studio</p><h1>让原片回到<br />它本来的质感。</h1></div>
        <div>
          <p>上传一张校园照片，系统会自动处理曝光、暗部、高光、色偏、噪点与锐度。保持构图和人物不变，只让光影更接近你按下快门时看到的画面。</p>
        </div>
      </header>
      <EnhanceStudio />
    </div>
  );
}