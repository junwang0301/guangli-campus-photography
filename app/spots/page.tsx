import type { Metadata } from "next";
import Image from "next/image";
import { Clock3, Info, Lightbulb, MapPin } from "lucide-react";
import { campusSpots } from "@/lib/content";

export const metadata: Metadata = { title: "校园取景点位" };

export default function SpotsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero__inner">
          <div>
            <p className="eyebrow">Campus locations</p>
            <h1>校园取景灵感</h1>
            <div className="demo-note"><Info size={17} aria-hidden="true" /> 当前点位为设计演示数据，正式版本将支持按学校和主题筛选。</div>
          </div>
          <p>好照片不只来自设备。找到光线、时间和人与空间相遇的瞬间，普通校园也会有值得反复拍摄的角落。</p>
        </div>
      </section>
      <section className="shell section">
        <div className="spot-grid">
          {campusSpots.map((spot) => (
            <article className="spot-card" key={spot.id}>
              <div className="spot-card__image"><Image src={spot.image} alt={`${spot.school}${spot.name}`} fill sizes="(max-width: 780px) 100vw, 42vw" /></div>
              <div className="spot-card__body">
                <h2>{spot.name}</h2>
                <span className="spot-card__school">{spot.school}</span>
                <div className="spot-details">
                  <div><span><Clock3 size={14} aria-hidden="true" /> 建议时段</span><strong>{spot.time}</strong></div>
                  <div><span><Lightbulb size={14} aria-hidden="true" /> 光线类型</span><strong>{spot.light}</strong></div>
                </div>
                <p className="spot-tip"><MapPin size={15} aria-hidden="true" /> {spot.tip}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="shell section">
        <div className="cta-panel">
          <p className="eyebrow">Share your spot</p>
          <h2>你的学校，也有只属于你的最佳机位。</h2>
          <p>后续版本将允许学生提交点位、补充实拍时间与样片。首版先以精选示例展示产品方向。</p>
        </div>
      </section>
    </>
  );
}