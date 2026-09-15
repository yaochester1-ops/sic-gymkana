"use client";

import { useEffect, useRef, useState } from "react";
import { PRIZE_POOL } from "@/lib/data";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// 两侧发钱枪分别向内上方喷射钞票。
const GUN_BILLS = Array.from({ length: 18 }, (_, i) => ({
  drift: 25 + ((i * 37) % 95),
  peak: -100 - ((i * 29) % 110),
  spin: 100 + ((i * 71) % 220),
  delay: -(i * 0.23),
  scale: 0.8 + (i % 3) * 0.18,
}));

function MoneyGun({ side }: { side: "left" | "right" }) {
  return (
    <svg viewBox="0 0 240 170" className={`money-gun money-gun--${side}`}>
      <g transform={side === "right" ? "translate(240 0) scale(-1 1)" : undefined}>
        <path d="M78 89h57l-10 65H84l9-46H78Z" fill="#a30718" stroke="#ff6975" strokeWidth="2" />
        <path d="M130 95h24v26h-24" fill="none" stroke="#e51c32" strokeWidth="9" />
        <path d="M20 38 39 22h142l24 20v57H20Z" fill="#ed1c24" stroke="#ff6975" strokeWidth="2" />
        <path d="M39 22h142l24 20H20Z" fill="#ff4b55" />
        <path d="M181 22 205 42v57l-24-12Z" fill="#b60819" />
        <rect x="195" y="42" width="31" height="45" rx="5" fill="#650811" stroke="#ff6975" strokeWidth="2" />
        <path d="M216 50h10v26h-10Z" fill="#21090d" />
        <path d="m207 49 27-6 3 19-28 6Z" fill="#d6f3bf" stroke="#60975f" strokeWidth="2" />
        <path d="m216 51 15-3m-13 9 15-3" stroke="#60975f" strokeWidth="2" />
        <path d="M29 91h141" stroke="#ff8189" strokeWidth="2" />
      </g>
      <text x={side === "left" ? 100 : 140} y="76" textAnchor="middle" fill="white" fontFamily="Arial, sans-serif" fontSize="29" fontWeight="900" fontStyle="italic" letterSpacing="-1.6">Supreme</text>
    </svg>
  );
}

// 满屏美金雨：从页面顶部持续落下，像水一样铺满整个页面
const DOLLAR_RAIN = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 29) % 100,
  duration: 10 + ((i * 13) % 9),
  delay: -((i * 37) % 16),
  size: 1.6 + ((i * 11) % 4) * 0.3,
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

          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-visible">
            <div className="absolute bottom-5 left-[10%] h-14 w-4/5 rounded-full bg-red-600/20 blur-2xl" />
            {(["left", "right"] as const).map((side) => (
              <div key={side}>
                {GUN_BILLS.map((bill, i) => (
                  <span
                    key={i}
                    className="gun-blast"
                    style={{
                      left: side === "left" ? "32%" : "68%",
                      bottom: "145px",
                      "--drift": `${bill.drift * (side === "left" ? 1 : -1)}px`,
                      "--peak": `${bill.peak}px`,
                      "--spin": `${bill.spin * (side === "left" ? 1 : -1)}deg`,
                      "--bill-scale": bill.scale,
                      animationDelay: `${bill.delay - (side === "right" ? 0.12 : 0)}s`,
                    } as React.CSSProperties}
                  >
                    💵
                  </span>
                ))}
                <MoneyGun side={side} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
