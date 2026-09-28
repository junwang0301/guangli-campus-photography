import type { Metadata } from "next";
import { Info } from "lucide-react";
import { EnhanceStudio } from "@/components/enhance-studio";

export const metadata: Metadata = { title: "AI 修图工作台" };

export default function StudioPage() {
  return (
    <div className="shell studio-page">
      <header className="studio-heading">
        <div><p className="eyebrow">AI photo studio</p><h1>让原片回到<br />它本来的质感。</h1></div>
        <div>
          <p>上传一张校园照片，系统会自动处理曝光、暗部、高光、色偏、噪点与锐度。保持构图和人物不变，只让光影更接近你按下快门时看到的画面。</p>
          <div className="demo-note"><Info size={17} aria-hidden="true" /> GitHub Pages 静态版会在浏览器中直接调用阿里云百炼千问图像编辑；未配置有效 Key 时会自动使用浏览器本地基础增强，API Key 对访客可见，仅建议个人演示使用。</div>
        </div>
      </header>
      <EnhanceStudio />
    </div>
  );
}