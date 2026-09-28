import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell section">
      <p className="eyebrow">404 / Missing frame</p>
      <h1 className="about-lead">这一帧不在相册里。</h1>
      <p>你访问的页面不存在，回到首页重新开始浏览。</p>
      <Link className="button button--accent" href="/">返回首页</Link>
    </section>
  );
}