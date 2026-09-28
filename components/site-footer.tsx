import Link from "next/link";
import { Aperture } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <div className="brand brand--footer">
            <span className="brand__mark" aria-hidden="true"><span /></span>
            <span><strong>光厘</strong><small>GUANGLI</small></span>
          </div>
          <p>让每一份校园里的光，都被认真看见。</p>
        </div>
        <div className="footer-links">
          <Link href="/studio">AI 修图</Link>
          <Link href="/community">作品社区</Link>
          <Link href="/spots">校园取景</Link>
          <Link href="/about">关于我们</Link>
        </div>
        <div className="footer-meta">
          <Aperture aria-hidden="true" size={18} />
          <span>学生摄影作品 AI 优化与分享计划</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} 光厘</span>
        <span>图片仅用于本次处理，不在服务器持久保存</span>
      </div>
    </footer>
  );
}