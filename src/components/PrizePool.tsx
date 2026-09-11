"use client";

import { useEffect, useRef, useState } from "react";
import { PRIZE_POOL } from "@/lib/data";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// 喷泉水珠：从顶部喷口喷出的水滴，drift 控制左右偏移，delay 错开节奏
// 流钱效果：人民币纸钞像水一样从喷口连续喷涌而出（无旋转，保持流畅感）
const MONEY_BILLS = Array.from({ length: 18 }, (_, i) => ({
  drift: -110 + i * 13,
  delay: (i % 9) * 0.16,
  scale: 0.85 + (i % 3) * 0.15,
}));

// 装饰闪光点：水面反光
const SPARKLES = [
  { x: -95, bottom: 210, delay: 0 },
  { x: 100, bottom: 180, delay: 0.5 },
  { x: -75, bottom: 110, delay: 1 },
  { x: 90, bottom: 95, delay: 1.5 },
  { x: -30, bottom: 235, delay: 0.8 },
  { x: 35, bottom: 60, delay: 2 },
];

export default function PrizePool() {
  const [displayValue, setDisplayValue] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = easeOutExpo(progress);
            setDisplayValue(Math.round(PRIZE_POOL.amountCNY * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const digits = displayValue.toLocaleString("zh-CN").split("");

  return (
    <section id="prize-pool" className="px-6 py-20">
      <div
        ref={sectionRef}
        className="card-surface relative mx-auto flex max-w-3xl flex-col items-center overflow-hidden rounded-2xl px-8 pb-96 pt-14 text-center"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
          滚动奖池
        </span>

        <div className="relative mt-4 flex items-center justify-center font-display text-5xl font-bold tabular-nums sm:text-6xl">
          <span className="text-gradient mr-2">¥</span>
          {digits.map((char, i) => (
            <span
              key={i}
              className={
                char === "," ? "text-foreground-muted" : "text-gradient"
              }
            >
              {char}
            </span>
          ))}
        </div>

        <p className="relative mt-4 text-sm text-foreground-muted">
          {PRIZE_POOL.updatedNote}
        </p>

        {/* 豪华三层喷泉：水珠从顶部喷口喷出，沿逐层水盆跌落 */}
        {/* 豪华三层喷泉：人民币纸钞像水一样从顶部喷口连续喷涌，沿逐层水盆跌落 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 flex h-64 items-end justify-center overflow-visible"
        >
          {/* 地面光晕 */}
          <div className="absolute bottom-4 h-16 w-72 rounded-full bg-gradient-to-r from-accent-purple/30 via-accent-green/20 to-accent-purple/30 blur-2xl" />

          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="sparkle-twinkle absolute text-base"
              style={
                {
                  left: `calc(50% + ${s.x}px)`,
                  bottom: `${s.bottom}px`,
                  animationDelay: `${s.delay}s`,
                } as React.CSSProperties
              }
            >
              ✨
            </span>
          ))}

          {/* 逐层跌落的水帘 */}
          <span
            className="money-stream absolute left-1/2 -translate-x-1/2"
            style={{ bottom: "144px", height: "34px" }}
          />
          <span
            className="money-stream absolute left-1/2 -translate-x-1/2"
            style={{ bottom: "76px", height: "48px", animationDelay: "0.2s" }}
          />

          {MONEY_BILLS.map((d, i) => (
            <span
              key={i}
              className="money-flow"
              style={
                {
                  "--drift": `${d.drift}px`,
                  "--bill-scale": d.scale,
                  animationDelay: `${d.delay}s`,
                } as React.CSSProperties
              }
            >
              💴
            </span>
          ))}

          <svg
            viewBox="0 0 240 210"
            className="relative h-64 w-72"
          >
            <defs>
              <linearGradient id="fountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <linearGradient id="fountainRim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e9d5ff" />
                <stop offset="100%" stopColor="#bbf7d0" />
              </linearGradient>
            </defs>

            {/* 雕花底座 */}
            <path
              d="M40 196 C40 190 70 186 120 186 C170 186 200 190 200 196 C200 202 170 206 120 206 C70 206 40 202 40 196 Z"
              fill="url(#fountainGradient)"
              opacity="0.85"
            />
            <rect x="94" y="178" width="52" height="14" rx="2" fill="url(#fountainGradient)" opacity="0.9" />

            {/* 第一层：底部大水盆 */}
            <path
              d="M14 178 C14 158 40 144 120 144 C200 144 226 158 226 178 C226 190 200 196 120 196 C40 196 14 190 14 178 Z"
              fill="url(#fountainGradient)"
            />
            <ellipse cx="120" cy="178" rx="90" ry="13" fill="none" stroke="url(#fountainRim)" strokeWidth="2.5" opacity="0.8" />
            <ellipse className="fountain-base" cx="120" cy="178" rx="78" ry="9" fill="url(#fountainGradient)" opacity="0.95" />

            {/* 雕花立柱一（带凹槽装饰） */}
            <rect x="110" y="108" width="20" height="40" rx="4" fill="url(#fountainGradient)" />
            <line x1="116" y1="112" x2="116" y2="144" stroke="#0a0f0c" strokeWidth="1.5" opacity="0.35" />
            <line x1="124" y1="112" x2="124" y2="144" stroke="#0a0f0c" strokeWidth="1.5" opacity="0.35" />

            {/* 第二层：中部水盆 */}
            <path
              d="M62 108 C62 96 80 88 120 88 C160 88 178 96 178 108 C178 118 160 124 120 124 C80 124 62 118 62 108 Z"
              fill="url(#fountainGradient)"
            />
            <ellipse cx="120" cy="108" rx="52" ry="9" fill="none" stroke="url(#fountainRim)" strokeWidth="2" opacity="0.8" />
            <ellipse className="fountain-base" cx="120" cy="108" rx="44" ry="6" fill="url(#fountainGradient)" opacity="0.95" />

            {/* 雕花立柱二 */}
            <rect x="113" y="66" width="14" height="26" rx="3" fill="url(#fountainGradient)" />

            {/* 第三层：顶部小水盆 */}
            <path
              d="M92 66 C92 59 104 54 120 54 C136 54 148 59 148 66 C148 72 136 76 120 76 C104 76 92 72 92 66 Z"
              fill="url(#fountainGradient)"
            />
            <ellipse cx="120" cy="66" rx="26" ry="5.5" fill="none" stroke="url(#fountainRim)" strokeWidth="1.5" opacity="0.8" />
            <ellipse className="fountain-base" cx="120" cy="66" rx="21" ry="3.5" fill="url(#fountainGradient)" opacity="0.95" />

            {/* 顶部装饰球与皇冠喷口 */}
            <circle cx="120" cy="42" r="11" fill="url(#fountainGradient)" />
            <circle cx="120" cy="42" r="11" fill="none" stroke="url(#fountainRim)" strokeWidth="1.5" opacity="0.7" />
            <path
              d="M110 30 L113 22 L117 28 L120 18 L123 28 L127 22 L130 30 Z"
              fill="url(#fountainGradient)"
            />
            <rect x="117" y="10" width="6" height="12" rx="2" fill="url(#fountainGradient)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
