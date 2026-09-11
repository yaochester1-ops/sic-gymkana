"use client";

import { useEffect, useRef, useState } from "react";
import { PRIZE_POOL } from "@/lib/data";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// 喷泉撒钱粒子：从喷泉顶部喷口喷出的纸钞/硬币，drift 控制左右偏移，spin 控制旋转，delay 错开节奏
const MONEY_PARTICLES = [
  { emoji: "💴", drift: -78, spin: -20, delay: 0 },
  { emoji: "🪙", drift: -55, spin: 18, delay: 0.18 },
  { emoji: "💴", drift: -32, spin: -12, delay: 0.36 },
  { emoji: "🪙", drift: -10, spin: 22, delay: 0.54 },
  { emoji: "💴", drift: 12, spin: -16, delay: 0.72 },
  { emoji: "🪙", drift: 34, spin: 12, delay: 0.9 },
  { emoji: "💴", drift: 58, spin: 26, delay: 1.08 },
  { emoji: "🪙", drift: 78, spin: -26, delay: 1.26 },
  { emoji: "💴", drift: -20, spin: 16, delay: 1.44 },
  { emoji: "🪙", drift: 20, spin: -10, delay: 1.62 },
  { emoji: "💴", drift: -45, spin: 14, delay: 1.8 },
  { emoji: "🪙", drift: 45, spin: -18, delay: 1.98 },
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
        className="card-surface relative mx-auto flex max-w-2xl flex-col items-center overflow-hidden rounded-2xl px-8 pb-40 pt-12 text-center"
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

        {/* 喷泉撒钱动画：纸钞/硬币从喷泉顶部喷口持续喷出，随报名人数增长的寓意 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-visible"
        >
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

          {/* 喷泉造型：底座水盆 + 泉柱 + 上层水盆 + 喷口 */}
          <svg
            viewBox="0 0 120 90"
            className="absolute bottom-0 left-1/2 h-20 w-28 -translate-x-1/2"
          >
            <defs>
              <linearGradient id="fountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            {/* 底座水盆 */}
            <path
              d="M14 80 C14 68 30 60 60 60 C90 60 106 68 106 80 C106 86 90 90 60 90 C30 90 14 86 14 80 Z"
              fill="url(#fountainGradient)"
              opacity="0.9"
            />
            <ellipse
              className="fountain-base"
              cx="60"
              cy="80"
              rx="46"
              ry="7"
              fill="url(#fountainGradient)"
            />
            {/* 泉柱 */}
            <rect x="54" y="34" width="12" height="28" rx="3" fill="url(#fountainGradient)" />
            {/* 上层水盆 */}
            <path
              d="M40 34 C40 29 48 25 60 25 C72 25 80 29 80 34 C80 38 72 40 60 40 C48 40 40 38 40 34 Z"
              fill="url(#fountainGradient)"
              opacity="0.9"
            />
            <ellipse
              className="fountain-base"
              cx="60"
              cy="34"
              rx="22"
              ry="4.5"
              fill="url(#fountainGradient)"
            />
            {/* 喷口 */}
            <rect x="56" y="10" width="8" height="18" rx="3" fill="url(#fountainGradient)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
