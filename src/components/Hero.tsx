import Link from "next/link";
import { EVENT } from "@/lib/data";

export default function Hero() {
  return (
    <section className="bg-glow relative overflow-hidden px-6 pb-24 pt-20 text-center">

      <div className="mx-auto max-w-3xl animate-fade-up">
        <span className="inline-block rounded-full border border-border bg-background-elevated px-4 py-1 text-xs font-medium tracking-wide text-foreground-muted">
          {EVENT.season} · {EVENT.tagline}
        </span>

        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          <span className="text-gradient">{EVENT.name}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
          {EVENT.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/registration"
            className="w-full rounded-full bg-gradient-to-r from-accent-purple to-accent-green px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-green/25 transition-transform hover:scale-105 sm:w-auto"
          >
            立即报名参赛
          </Link>
          <Link
            href="/leaderboard"
            className="w-full rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-purple-light hover:text-accent-purple-light sm:w-auto"
          >
            查看圈速榜
          </Link>
        </div>
      </div>
    </section>
  );
}
