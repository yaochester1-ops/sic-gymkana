"use client";

import { useEffect, useRef, useState } from "react";
import { PRIZE_POOL } from "@/lib/data";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

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
    <section id="prize-pool" className="border-b border-border px-6 py-20">
      <div
        ref={sectionRef}
        className="card-surface mx-auto flex max-w-2xl flex-col items-center rounded-2xl px-8 py-12 text-center"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
          滚动奖池
        </span>

        <div className="mt-4 flex items-center justify-center font-display text-5xl font-bold tabular-nums sm:text-6xl">
          <span className="text-gradient mr-2">¥</span>
          {digits.map((char, i) => (
            <span
              key={i}
              className={
                char === ","
                  ? "text-foreground-muted"
                  : "text-gradient"
              }
            >
              {char}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm text-foreground-muted">
          {PRIZE_POOL.updatedNote}
        </p>
      </div>
    </section>
  );
}
