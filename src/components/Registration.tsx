import { REGISTRATION } from "@/lib/data";

export default function Registration() {
  return (
    <section id="registration" className="px-6 py-20">
      <div className="card-surface bg-glow mx-auto max-w-3xl rounded-2xl px-8 py-14 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          准备好上赛道了吗？
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground-muted">
          填写报名信息，加入飞驰十三金卡纳，与全国顶尖车手同场竞速。
        </p>

        <a
          href={REGISTRATION.url}
          target={REGISTRATION.isPlaceholder ? undefined : "_blank"}
          rel={REGISTRATION.isPlaceholder ? undefined : "noopener noreferrer"}
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-accent-purple to-accent-green px-10 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-green/25 transition-transform hover:scale-105"
        >
          前往报名通道
        </a>

        <p className="mt-4 text-xs text-foreground-muted">
          {REGISTRATION.deadlineNote}
          {REGISTRATION.isPlaceholder && "（报名链接即将开放）"}
        </p>
      </div>
    </section>
  );
}
