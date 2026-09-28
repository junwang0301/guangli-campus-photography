import type { Metadata } from "next";
import { Images, Info } from "lucide-react";
import { PhotoCard } from "@/components/photo-card";
import { works } from "@/lib/content";

export const metadata: Metadata = { title: "校园作品社区" };

export default function CommunityPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero__inner">
          <div>
            <p className="eyebrow">Campus works</p>
            <h1>校园作品社区</h1>
            <div className="demo-note"><Info size={17} aria-hidden="true" /> 当前为 MVP 静态演示内容，真实发布和互动功能将在后续版本接入。</div>
          </div>
          <p>聚合校园人像、纪实、风光、建筑与静物作品，让同校与跨校的摄影爱好者拥有更纯粹的交流空间。</p>
        </div>
      </section>
      <section className="shell section">
        <div className="section-heading">
          <h2>今日光影精选</h2>
          <p>作品卡片同时记录拍摄思路，帮助读者不只看见结果，也理解一张照片如何发生。</p>
        </div>
        <div className="works-grid">
          {works.map((work, index) => <PhotoCard key={work.id} work={work} priority={index < 2} />)}
        </div>
      </section>
      <section className="shell section">
        <div className="notice"><Images size={18} aria-hidden="true" /> 首版不提供登录、发帖、点赞、评论或收藏。后续接入数据库与对象存储后，再开放真实社区能力。</div>
      </section>
    </>
  );
}