import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Images, MapPin, ShieldCheck, Sparkles, WandSparkles } from "lucide-react";
import { PhotoCard } from "@/components/photo-card";
import { works } from "@/lib/content";

const features = [
  {
    icon: WandSparkles,
    title: "一键智能优化",
    text: "自动修正曝光、暗部、高光、色偏、噪点与细节，处理过程不需要修图基础。",
  },
  {
    icon: Images,
    title: "校园作品社区",
    text: "围绕校园人像、纪实、风光和建筑，展示属于大学生的原创光影表达。",
  },
  {
    icon: MapPin,
    title: "取景点位灵感",
    text: "从时间、光线和拍摄技巧出发，帮助新手找到校园里真正好拍的地方。",
  },
  {
    icon: ShieldCheck,
    title: "原创优先原则",
    text: "不保存服务端图片，不添加平台水印，尊重每一份学生摄影作品的版权。",
  },
];

const steps = [
  { number: "01", title: "上传原片", text: "支持 JPEG、PNG、WebP。浏览器会在本地缩放与压缩，原图不会被持久保存。" },
  { number: "02", title: "一键优化", text: "服务端调用图像模型，保留人物、构图与现场气氛，只做克制、自然的摄影增强。" },
  { number: "03", title: "对比下载", text: "拖动前后对比滑块检查变化，满意后直接下载优化成片。" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero__grid">
          <div>
            <p className="eyebrow">Campus photography lab</p>
            <h1>
              把校园里的光，
              <em>修成你想要的样子。</em>
            </h1>
            <p className="hero__lead">
              光厘为大学生摄影作品提供一键 AI 优化，也让每一次快门、每一个校园机位，都有被看见的机会。
            </p>
            <div className="hero__actions">
              <Link className="button button--accent" href="/studio">
                开始优化照片 <Sparkles size={17} aria-hidden="true" />
              </Link>
              <Link className="button button--ghost" href="/community">
                浏览校园作品 <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <p className="hero__note">
              <Camera size={16} aria-hidden="true" />
              无需修图基础 · 服务端不持久保存图片
            </p>
          </div>

          <div className="hero__visual" aria-label="校园摄影作品拼贴">
            <div className="hero-photo hero-photo--main">
              <Image src="/demo/campus-dawn.svg" alt="晨光中的校园建筑" fill priority loading="eager" sizes="(max-width: 1080px) 100vw, 42vw" />
              <span className="hero-index">NO. 001 / DAWN</span>
            </div>
            <div className="hero-photo hero-photo--small">
              <Image src="/demo/rooftop-sunset.svg" alt="天台日落剪影" fill sizes="20vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="shell section--tight" aria-label="平台特点">
        <div className="stats">
          <div className="stat"><strong>1 键</strong><span>完成摄影画质优化</span></div>
          <div className="stat"><strong>2048px</strong><span>上传前智能缩放上限</span></div>
          <div className="stat"><strong>0 张</strong><span>服务器持久保存照片</span></div>
        </div>
      </section>

      <section className="shell section">
        <div className="section-heading">
          <h2>从工具到社区，<br />让创作走得更远。</h2>
          <p>先解决修图门槛，再用垂直社区沉淀校园影像内容。首版聚焦核心体验，为后续真实互动预留清晰路径。</p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
              <span className="feature-card__icon"><Icon size={22} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section">
        <div className="section-heading">
          <h2>校园里的光，<br />正在被记录。</h2>
          <Link className="text-link" href="/community">查看全部作品 <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="works-grid">
          {works.slice(0, 3).map((work, index) => <PhotoCard key={work.id} work={work} priority={index === 0} />)}
        </div>
      </section>

      <section className="shell section">
        <div className="process">
          <div className="process__intro">
            <p className="eyebrow">Simple workflow</p>
            <h2>三步完成，<br />把更多时间留给拍摄。</h2>
          </div>
          <div className="process__steps">
            {steps.map((step) => (
              <article className="process-step" key={step.number}>
                <span>{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="cta-panel">
          <p className="eyebrow">Ready to try</p>
          <h2>下一张校园照片，值得更认真地被看见。</h2>
          <p>上传一张原片，体验自然、克制的 AI 摄影增强。首版无需注册，处理后即可下载。</p>
          <Link className="button button--accent" href="/studio">进入 AI 修图工作台 <Sparkles size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}