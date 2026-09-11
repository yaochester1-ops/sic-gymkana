"use client";

import { useEffect, useRef, useState } from "react";
import { PRIZE_POOL } from "@/lib/data";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// 喷泉撒钱粒子：从喷泉顶部喷口喷出的纸钞/硬币，drift 控制左右偏移，spin 控制旋转，delay 错开节奏
const MONEY_PARTICLES = [
  { emoji: "💴", drift: -110, spin: -24, delay: 0 },
  { emoji: "🪙", drift: -88, spin: 20, delay: 0.14 },
  { emoji: "💴", drift: -64, spin: -16, delay: 0.28 },
  { emoji: "🪙", drift: -40, spin: 24, delay: 0.42 },
  { emoji: "💴", drift: -16, spin: -12, delay: 0.56 },
  { emoji: "🪙", drift: 8, spin: 18, delay: 0.7 },
  { emoji: "💴", drift: 30, spin: -20, delay: 0.84 },
  { emoji: "🪙", drift: 54, spin: 14, delay: 0.98 },
  { emoji: "💴", drift: 78, spin: -26, delay: 1.12 },
  { emoji: "🪙", drift: 102, spin: 22, delay: 1.26 },
  { emoji: "💴", drift: -50, spin: 16, delay: 1.4 },
  { emoji: "🪙", drift: -24, spin: -18, delay: 1.54 },
  { emoji: "💴", drift: 2, spin: 20, delay: 1.68 },
  { emoji: "🪙", drift: 40, spin: -14, delay: 1.82 },
  { emoji: "💴", drift: 66, spin: 12, delay: 1.96 },
  { emoji: "🪙", drift: -76, spin: -22, delay: 2.1 },
];

// 装饰闪光点，围绕喷泉原地闪烁
const SPARKLES = [
  { emoji: "✨", x: -95, bottom: 210, delay: 0 },
  { emoji: "✨", x: 100, bottom: 180, delay: 0.5 },
  { emoji: "✨", x: -75, bottom: 110, delay: 1 },
  { emoji: "✨", x: 90, bottom: 95, delay: 1.5 },
  { emoji: "✨", x: -30, bottom: 235, delay: 0.8 },
  { emoji: "✨", x: 35, bottom: 60, delay: 2 },
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

        {/* 豪华喷泉撒钱动画：三层水盆 + 雕花底座 + 顶部球形喷口，钱币持续喷涌 */}
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
              {s.emoji}
            </span>
          ))}

          {MONEY_PARTICLES.map((p, i) => (
            <span
              key={i}
              className="money-particle"
              style={
                {
                  "--drift": `${p.drift}px`,
                  "--spin": `${p.spin}deg`,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties
              }
            >
              {p.emoji}
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
