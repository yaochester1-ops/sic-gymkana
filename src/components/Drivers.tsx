"use client";

import { useState } from "react";
import { DRIVERS, type DriverEntry } from "@/lib/data";
import DriverProfileModal from "./DriverProfileModal";

export default function Drivers() {
  const [selectedDriver, setSelectedDriver] = useState<DriverEntry | null>(
    null
  );

  return (
    <section id="drivers" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent-purple-light">
            Drivers
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            参赛车手
          </h2>
          {DRIVERS.length > 0 && (
            <p className="mt-3 text-sm text-foreground-muted">
              点击头像查看车辆配置
            </p>
          )}
        </div>

        {DRIVERS.length === 0 ? (
          <div className="card-surface rounded-2xl px-6 py-12 text-center">
            <p className="text-base text-foreground-muted">暂无车手报名，期待你的加入！</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {DRIVERS.map((driver) => (
            <button
              key={driver.rank}
              type="button"
              onClick={() => setSelectedDriver(driver)}
              className="card-surface flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center transition-transform hover:-translate-y-1 hover:border-accent-purple-light"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-green font-display text-2xl font-bold text-white">
                {driver.number}
              </span>
              <div>
                <p className="font-display text-base font-semibold">
                  {driver.name}
                </p>
                <p className="mt-1 text-xs text-foreground-muted">
                  {driver.nationality}
                </p>
              </div>
            </button>
          ))}
        </div>
        )}
      </div>

      <DriverProfileModal
        driver={selectedDriver}
        onClose={() => setSelectedDriver(null)}
      />
    </section>
  );
}
