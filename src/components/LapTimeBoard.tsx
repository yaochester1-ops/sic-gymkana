"use client";

import { useState } from "react";
import { DRIVERS, type DriverEntry } from "@/lib/data";
import DriverProfileModal from "./DriverProfileModal";

const RANK_STYLES: Record<number, string> = {
  1: "bg-gradient-to-r from-accent-gold/90 to-accent-gold/60 text-black",
  2: "bg-gradient-to-r from-zinc-300 to-zinc-400 text-black",
  3: "bg-gradient-to-r from-amber-700 to-amber-600 text-white",
};

export default function LapTimeBoard() {
  const [selectedDriver, setSelectedDriver] = useState<DriverEntry | null>(
    null
  );

  return (
    <section id="leaderboard" className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent-green-light">
            Lap Times
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            车手圈速榜
          </h2>
          <p className="mt-3 text-sm text-foreground-muted">
            示例占位数据，正式成绩将于赛后同步更新（按最佳圈速排名，用时越短排名越高，点击车手查看简历）
          </p>
        </div>

        {/* 手机端：卡片列表，避免最佳圈速被挤出屏幕外还看不出能滑动 */}
        <div className="card-surface divide-y divide-border/60 rounded-2xl sm:hidden">
          {DRIVERS.map((driver) => (
            <button
              key={driver.rank}
              type="button"
              onClick={() => setSelectedDriver(driver)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
                  RANK_STYLES[driver.rank] ??
                  "bg-background-elevated text-foreground-muted"
                }`}
              >
                {driver.rank}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple/30 to-accent-green/30 font-display text-[10px] font-semibold text-foreground">
                    #{driver.number}
                  </span>
                  <span className="truncate font-medium">{driver.name}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-foreground-muted">
                  {driver.carModel} · {driver.penalty}
                </p>
              </div>
              <div className="shrink-0 text-right font-display text-base font-semibold text-gradient">
                {driver.bestLap}
              </div>
            </button>
          ))}
        </div>

        {/* 平板与桌面：完整表格 */}
        <div className="card-surface hidden overflow-x-auto rounded-2xl sm:block">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-foreground-muted">
                <th className="px-6 py-4 font-medium">排名</th>
                <th className="px-6 py-4 font-medium">车手</th>
                <th className="px-6 py-4 font-medium">车型</th>
                <th className="px-6 py-4 font-medium">罚时</th>
                <th className="px-6 py-4 text-right font-medium">最佳圈速</th>
              </tr>
            </thead>
            <tbody>
              {DRIVERS.map((driver) => (
                <tr
                  key={driver.rank}
                  onClick={() => setSelectedDriver(driver)}
                  className="cursor-pointer border-b border-border/60 last:border-b-0 hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold ${
                        RANK_STYLES[driver.rank] ??
                        "bg-background-elevated text-foreground-muted"
                      }`}
                    >
                      {driver.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple/30 to-accent-green/30 font-display text-xs font-semibold text-foreground">
                        #{driver.number}
                      </span>
                      <span className="font-medium">{driver.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground-muted">
                    {driver.carModel}
                  </td>
                  <td className="px-6 py-4 text-foreground-muted">
                    {driver.penalty}
                  </td>
                  <td className="px-6 py-4 text-right font-display text-lg font-semibold text-gradient">
                    {driver.bestLap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DriverProfileModal
        driver={selectedDriver}
        onClose={() => setSelectedDriver(null)}
      />
    </section>
  );
}
