"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { DriverEntry } from "@/lib/data";

const RANK_STYLES: Record<number, string> = {
  1: "bg-gradient-to-r from-accent-gold/90 to-accent-gold/60 text-black",
  2: "bg-gradient-to-r from-zinc-300 to-zinc-400 text-black",
  3: "bg-gradient-to-r from-amber-700 to-amber-600 text-white",
};

export default function DriverProfileModal({
  driver,
  onClose,
}: {
  driver: DriverEntry | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!driver) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [driver, onClose]);

  if (!driver || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card-surface bg-glow w-full max-w-sm overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 border-b border-border px-6 py-6">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-xl font-bold ${
              RANK_STYLES[driver.rank] ??
              "bg-background-elevated text-foreground-muted"
            }`}
          >
            {driver.rank}
          </span>
          <div className="min-w-0">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent-green-light">
              #{driver.number} · 车手简历
            </span>
            <h3 className="truncate font-display text-2xl font-bold">
              {driver.name}
            </h3>
            <p className="mt-0.5 text-sm text-foreground-muted">
              {driver.nationality}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-5 px-6 py-6">
          <div>
            <dt className="text-xs text-foreground-muted">车队</dt>
            <dd className="mt-1 font-display text-base font-semibold">
              {driver.team}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-foreground-muted">车辆</dt>
            <dd className="mt-1 font-display text-base font-semibold">
              {driver.carModel}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-foreground-muted">马力</dt>
            <dd className="mt-1 font-display text-base font-semibold text-gradient">
              {driver.horsepower}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-foreground-muted">轮胎</dt>
            <dd className="mt-1 font-display text-base font-semibold">
              {driver.tires}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-foreground-muted">最佳圈速</dt>
            <dd className="mt-1 font-display text-base font-semibold text-gradient">
              {driver.bestLap}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-foreground-muted">罚时</dt>
            <dd className="mt-1 font-display text-base font-semibold">
              {driver.penalty}
            </dd>
          </div>
        </dl>

        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-purple-light hover:text-accent-purple-light"
          >
            关闭
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
