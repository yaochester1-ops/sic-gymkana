"use client";

import { useEffect, useRef, useState } from "react";
import { PRIZE_POOL } from "@/lib/data";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// 撒钱枪：从中央炮口向左右两侧大范围扇形喷射美金
const GUN_BILLS = Array.from({ length: 30 }, (_, i) => {
  const side = i % 2 === 0 ? -1 : 1;
  const spread = 40 + ((i * 53) % 190); // 左右扩散 40 ~ 230px
  return {
    drift: side * spread,
    peak: -130 - ((i * 29) % 90), // 喷射高度 -130 ~ -220px
    spin: side * (140 + ((i * 71) % 220)), // 大幅翻转，像被打出去一样
    delay: (i % 12) * 0.13,
    scale: 0.8 + ((i * 17) % 3) * 0.18,
  };
});

// 装饰闪光点
const SPARKLES = [
  { x: -140, bottom: 200, delay: 0 },
  { x: 150, bottom: 170, delay: 0.5 },
  { x: -110, bottom: 100, delay: 1 },
  { x: 130, bottom: 90, delay: 1.5 },
  { x: -40, bottom: 225, delay: 0.8 },
  { x: 50, bottom: 55, delay: 2 },
];

// 满屏美金雨：从页面顶部持续落下，像水一样铺满整个页面
const DOLLAR_RAIN = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 29) % 100,
  duration: 6 + ((i * 13) % 7),
  delay: -((i * 37) % 12),
  size: 1 + ((i * 11) % 4) * 0.25,
  opacity: 0.16 + ((i * 7) % 4) * 0.06,
}));

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
    <>
      {/* 满屏美金雨背景，覆盖整个页面 */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        {DOLLAR_RAIN.map((d, i) => (
          <span
            key={i}
            className="dollar-rain absolute top-0"
            style={
              {
                left: `${d.left}%`,
                fontSize: `${d.size}rem`,
                opacity: d.opacity,
                animationDuration: `${d.duration}s`,
                animationDelay: `${d.delay}s`,
              } as React.CSSProperties
            }
          >
            💵
          </span>
        ))}
      </div>

      <section id="prize-pool" className="relative px-6 py-20">
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

          {/* 撒钱枪：一门大炮从正中央向左右两侧大范围喷射美金 */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 flex h-64 items-end justify-center overflow-visible"
          >
            {/* 地面光晕 */}
            <div className="absolute bottom-4 h-16 w-80 rounded-full bg-gradient-to-r from-accent-purple/30 via-accent-green/20 to-accent-purple/30 blur-2xl" />

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

            {GUN_BILLS.map((d, i) => (
              <span
                key={i}
                className="gun-blast"
                style={
                  {
                    "--drift": `${d.drift}px`,
                    "--peak": `${d.peak}px`,
                    "--spin": `${d.spin}deg`,
                    "--bill-scale": d.scale,
                    animationDelay: `${d.delay}s`,
                  } as React.CSSProperties
                }
              >
                💵
              </span>
            ))}

            <svg viewBox="0 0 240 190" className="relative h-44 w-72">
              <defs>
                <linearGradient id="gunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="gunRim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e9d5ff" />
                  <stop offset="100%" stopColor="#bbf7d0" />
                </linearGradient>
              </defs>

              {/* 手枪式撒钱枪：握把 + 扳机护圈 + 枪身 + 枪管 + 扇形出钞口 */}
              {/* 握把 */}
              <path
                d="M116 144 L98 144 L84 180 C83 184 86 187 90 186 L110 179 L118 148 Z"
                fill="url(#gunGradient)"
              />
              <line x1="94" y1="152" x2="105" y2="149" stroke="#0a0f0c" strokeWidth="1.5" opacity="0.25" />
              <line x1="91" y1="162" x2="102" y2="159" stroke="#0a0f0c" strokeWidth="1.5" opacity="0.25" />
              <line x1="88" y1="172" x2="99" y2="169" stroke="#0a0f0c" strokeWidth="1.5" opacity="0.25" />

              {/* 扳机护圈与扳机 */}
              <path
                d="M108 146 C102 146 98 150 98 156 C98 161 102 165 107 165"
                fill="none"
                stroke="url(#gunGradient)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <rect x="107" y="149" width="5" height="11" rx="2" fill="url(#gunGradient)" />

              {/* 枪身主体 */}
              <rect x="92" y="98" width="76" height="48" rx="9" fill="url(#gunGradient)" />
              <rect x="92" y="98" width="76" height="9" rx="4" fill="url(#gunRim)" opacity="0.35" />

              {/* 枪管 */}
              <rect x="110" y="48" width="40" height="54" rx="7" fill="url(#gunGradient)" />
              <rect x="106" y="42" width="48" height="12" rx="5" fill="url(#gunGradient)" />
              <rect x="106" y="42" width="48" height="4" rx="2" fill="url(#gunRim)" opacity="0.5" />

              {/* 扇形出钞口：一把钞票状叶片从枪口呈扇形展开 */}
              <g transform="translate(130,44)">
                {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
                  <rect
                    key={i}
                    x="-5"
                    y="-46"
                    width="10"
                    height="46"
                    rx="3"
                    fill={i % 2 === 0 ? "url(#gunGradient)" : "url(#gunRim)"}
                    opacity={i % 2 === 0 ? 0.95 : 0.8}
                    transform={`rotate(${i * 13})`}
                  />
                ))}
              </g>
              <ellipse
                className="fountain-base"
                cx="130"
                cy="44"
                rx="30"
                ry="6"
                fill="none"
                stroke="url(#gunRim)"
                strokeWidth="2"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
