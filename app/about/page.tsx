import type { Metadata } from "next";
import { Aperture, Copyright, ScanEye } from "lucide-react";

export const metadata: Metadata = { title: "关于光厘" };

const values = [
  { icon: Aperture, title: "真实优先", text: "AI 只做摄影增强，不替用户改写现场、人物和创作意图。" },
  { icon: Copyright, title: "尊重原创", text: "不加平台水印，不擅自传播用户原片，明确提示肖像与版权边界。" },
  { icon: ScanEye, title: "克制透明", text: "清楚说明图片会发送给 AI 服务处理，并让用户看到优化前后的完整变化。" },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero__inner">
          <div><p className="eyebrow">About guangli</p><h1>关于光厘</h1></div>
          <p>光厘立足大学生的真实摄影需求，尝试用轻量 AI 降低修图门槛，再用垂直校园社区让好作品获得更精准的回应。</p>
        </div>
      </section>
      <section className="shell section">
        <div className="about-grid">
          <p className="about-lead">“厘”是光线的微小刻度。光厘想做的，是认真对待校园照片里那些细小却真实的变化。</p>
          <div className="about-copy">
            <p>普通学生拍下的照片常常会受到曝光、色温、噪点和设备能力的限制，而专业修图软件的复杂操作又提高了创作门槛。光厘首先解决这个问题：上传一张原片，自动得到更自然、更清晰的摄影版本。</p>
            <p>当图片质量不再成为障碍，校园人像、纪实、风光、建筑和静物就有机会进入一个更专注于学生创作者的展示空间。首版先完成工具、展示与取景灵感的基础闭环。</p>
          </div>
        </div>
      </section>
      <section className="shell section">
        <div className="section-heading"><h2>我们的产品原则</h2><p>工具能力可以持续进化，但对真实、原创和用户边界的尊重不会改变。</p></div>
        <div className="values">
          {values.map(({ icon: Icon, title, text }) => <article className="value-card" key={title}><Icon size={23} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className="shell section">
        <div className="section-heading"><h2>从校园出发</h2><p>以可验证的小范围产品为目标，逐步补齐真实社区所需的基础设施。</p></div>
        <div className="roadmap">
          <article className="roadmap-item"><span>NOW / MVP</span><div><h3>AI 优化与静态展示</h3><p>完成一键图片增强、前后对比、下载、校园作品与取景点位展示。</p></div></article>
          <article className="roadmap-item"><span>NEXT / BETA</span><div><h3>真实社区与个人主页</h3><p>接入账号、数据库、对象存储、作品发布、点赞评论与个人相册。</p></div></article>
          <article className="roadmap-item"><span>LATER / SCALE</span><div><h3>多校取景库与内容运营</h3><p>扩大高校覆盖，沉淀校园点位、拍摄技巧与高质量原创作品。</p></div></article>
        </div>
      </section>
    </>
  );
}