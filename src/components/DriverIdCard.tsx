"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { EVENT } from "@/lib/data";

export type VehicleCategory = "two-wheel" | "four-wheel";

export const CATEGORY_LABELS: Record<VehicleCategory, string> = {
  "two-wheel": "两轮组",
  "four-wheel": "四轮组",
};

export type RegisteredDriver = {
  name: string;
  age: string;
  gender: string;
  vehicle: string;
  number: string;
  issuedAt: string;
  category: VehicleCategory;
};

export default function DriverIdCard({
  driver,
  onReset,
}: {
  driver: RegisteredDriver;
  onReset: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    QRCode.toDataURL("https://sicgymkana.com", {
      width: 160,
      margin: 1,
      color: { dark: "#101a14", light: "#f1faf4" },
    }).then(setQrDataUrl);
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#0a0f0c",
      });
      const link = document.createElement("a");
      link.download = `车手证-${driver.name || driver.number}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // 生成失败时静默忽略，用户仍可截图保存
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl border border-border bg-background-elevated p-6"
      >
        <div className="bg-glow pointer-events-none absolute inset-0" />

        <div className="relative flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-green font-display text-xs font-bold text-white">
              SIC
            </span>
            <div>
              <p className="font-display text-sm font-bold leading-tight">
                {EVENT.shortName}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
                {CATEGORY_LABELS[driver.category]} · Driver License
              </p>
            </div>
          </div>
          <span className="font-display text-lg font-bold text-gradient">
            NO.{driver.number}
          </span>
        </div>

        <div className="relative mt-5 flex gap-5">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-green font-display text-3xl font-bold text-white">
            {driver.name.slice(0, 1) || "?"}
          </span>

          <dl className="grid flex-1 grid-cols-2 gap-x-3 gap-y-2 text-left">
            <div className="col-span-2">
              <dt className="text-[10px] text-foreground-muted">姓名</dt>
              <dd className="truncate font-display text-lg font-semibold">
                {driver.name}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] text-foreground-muted">年龄</dt>
              <dd className="font-display text-sm font-semibold">
                {driver.age}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] text-foreground-muted">性别</dt>
              <dd className="font-display text-sm font-semibold">
                {driver.gender}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[10px] text-foreground-muted">参赛车辆</dt>
              <dd className="truncate font-display text-sm font-semibold">
                {driver.vehicle}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-[10px] text-foreground-muted">签发日期</p>
            <p className="text-xs text-foreground-muted">{driver.issuedAt}</p>
            <p className="mt-1 text-[10px] text-foreground-muted">
              {EVENT.season} · {EVENT.shortName}
            </p>
          </div>
          {qrDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="网站二维码"
              className="h-14 w-14 rounded"
            />
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onReset}
          className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-purple-light hover:text-accent-purple-light"
        >
          重新填写
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 rounded-full bg-gradient-to-r from-accent-purple to-accent-green py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:opacity-60"
        >
          {downloading ? "生成中…" : "下载车手证"}
        </button>
      </div>
    </div>
  );
}
