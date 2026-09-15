import Link from "next/link";
import { EVENT, VENUE } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={VENUE.photo}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="bg-glow absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />

      <div className="relative mx-auto max-w-3xl animate-fade-up">
        <span className="inline-block rounded-full border border-border bg-background-elevated px-4 py-1 text-xs font-medium tracking-wide text-foreground-muted">
          {EVENT.season} · {EVENT.tagline}
        </span>

        <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          <span className="text-gradient">{EVENT.name}</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-foreground sm:text-xl">
          全民赛车文化的开始 无门槛参加 以大奖赛形式聚集周边所有喜欢汽车的朋友
        </p>


        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/registration"
            className="w-full rounded-full bg-gradient-to-r from-accent-purple to-accent-green px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-green/25 transition-transform hover:scale-105 sm:w-auto"
          >
            立即报名参赛
          </Link>
        </div>
      </div>
    </section>
  );
}
