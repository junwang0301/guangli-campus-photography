import Image from "next/image";
import type { PhotoWork } from "@/lib/content";

export function PhotoCard({ work, priority = false }: { work: PhotoWork; priority?: boolean }) {
  return (
    <article className="photo-card">
      <div className="photo-card__image">
        <Image
          src={work.image}
          alt={`${work.title}，摄影作品演示图`}
          fill
          priority={priority}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span>{work.category}</span>
      </div>
      <div className="photo-card__body">
        <div>
          <h3>{work.title}</h3>
          <p>{work.author} · {work.school}</p>
        </div>
        <p className="photo-card__note">{work.note}</p>
      </div>
    </article>
  );
}