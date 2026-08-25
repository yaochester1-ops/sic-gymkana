"use client";

import { useEffect, useRef, useState } from "react";
import { PRIZE_POOL } from "@/lib/data";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// 喷泉撒钱粒子：从底部喷出的纸钞/硬币，drift 控制左右偏移，spin 控制旋转，delay 错开节奏
const MONEY_PARTICLES = [
  { emoji: "💴", drift: -70, spin: -20, delay: 0 },
  { emoji: "🪙", drift: -42, spin: 18, delay: 0.22 },
  { emoji: "💴", drift: -16, spin: -12, delay: 0.44 },
  { emoji: "🪙", drift: 8, spin: 22, delay: 0.66 },
  { emoji: "💴", drift: 34, spin: -16, delay: 0.88 },
  { emoji: "🪙", drift: 62, spin: 12, delay: 1.1 },
  { emoji: "💴", drift: -52, spin: 26, delay: 1.32 },
  { emoji: "🪙", drift: 2, spin: -26, delay: 1.54 },
  { emoji: "💴", drift: 48, spin: 16, delay: 1.76 },
  { emoji: "🪙", drift: -24, spin: 10, delay: 1.98 },
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
        className="card-surface relative mx-auto flex max-w-2xl flex-col items-center overflow-hidden rounded-2xl px-8 pb-32 pt-12 text-center"
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

        {/* 喷泉撒钱动画：纸钞/硬币从底部持续喷出，随报名人数增长的寓意 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 overflow-hidden"
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
          <div className="absolute inset-x-0 bottom-2 flex justify-center">
            <div className="fountain-base h-2 w-14 rounded-full bg-gradient-to-r from-accent-purple to-accent-green blur-[2px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
