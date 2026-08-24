import { VENUE } from "@/lib/data";

export default function Venue() {
  return (
    <section id="venue" className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent-purple-light">
            Venue
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            赛事地点
          </h2>
          <p className="mt-3 text-sm text-foreground-muted">
            临水而建的技术型卡丁赛道，多弯位组合考验车手的精准操控
          </p>
        </div>

        <div className="card-surface overflow-hidden rounded-2xl">
          <div className="relative h-64 w-full sm:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={VENUE.photo}
              alt={`${VENUE.name} 实景鸟瞰图`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                  {VENUE.englishName}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {VENUE.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 md:grid-cols-[auto_1fr] md:items-center">
            <svg
              viewBox="0 0 400 260"
              className="h-32 w-full max-w-xs justify-self-center opacity-90 md:justify-self-start"
              role="img"
              aria-label="赛道示意图，参考场地实景图绘制"
            >
              <defs>
                <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              {/* 起点/维修区直道 */}
              <path
                d="M30 190
                   L120 190
                   C150 190 155 165 135 150
                   C115 135 120 108 145 100
                   C170 92 165 65 190 60
                   C215 55 235 75 225 100
                   C218 118 235 130 255 122
                   C285 110 320 118 335 145
                   C350 172 335 200 305 205
                   C280 209 275 190 250 190
                   L160 232
                   C130 248 90 245 60 228
                   C40 217 30 205 30 190 Z"
                fill="none"
                stroke="url(#trackGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30 190
                   L120 190
                   C150 190 155 165 135 150
                   C115 135 120 108 145 100
                   C170 92 165 65 190 60
                   C215 55 235 75 225 100
                   C218 118 235 130 255 122
                   C285 110 320 118 335 145
                   C350 172 335 200 305 205
                   C280 209 275 190 250 190
                   L160 232
                   C130 248 90 245 60 228
                   C40 217 30 205 30 190 Z"
                fill="none"
                stroke="#0a0f0c"
                strokeWidth="1.5"
                strokeDasharray="6 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.45"
              />
              {/* 起点/终点旗 */}
              <g transform="translate(24, 180)">
                <rect x="-1.5" y="-14" width="3" height="26" fill="#f1faf4" opacity="0.8" />
                <rect x="1.5" y="-14" width="9" height="6" fill="#f1faf4" />
                <rect x="10.5" y="-14" width="4.5" height="6" fill="#22c55e" />
                <rect x="1.5" y="-8" width="4.5" height="5.5" fill="#22c55e" />
                <rect x="6" y="-8" width="4.5" height="5.5" fill="#f1faf4" />
                <rect x="10.5" y="-8" width="4.5" height="5.5" fill="#22c55e" />
              </g>
            </svg>

            <div className="flex flex-col gap-3">
              <p className="text-sm text-foreground-muted">{VENUE.city}</p>
              <p className="text-sm text-foreground-muted">{VENUE.addressNote}</p>

              <a
                href={VENUE.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-green px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-green/20 transition-transform hover:scale-105"
              >
                导航前往赛道
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
