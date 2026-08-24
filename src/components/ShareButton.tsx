"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { EVENT } from "@/lib/data";

const SITE_URL = "https://sic-gymkana.vercel.app";

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  useEffect(() => {
    if (!open || qrDataUrl) return;
    QRCode.toDataURL(SITE_URL, {
      width: 320,
      margin: 2,
      color: { dark: "#101a14", light: "#f1faf4" },
    }).then(setQrDataUrl);
  }, [open, qrDataUrl]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 剪贴板权限不可用时静默忽略
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: EVENT.name, url: SITE_URL });
    } catch {
      // 用户取消分享，忽略
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="分享网站"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent-purple-light hover:text-accent-purple-light"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              className="card-surface w-full max-w-xs rounded-2xl p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-lg font-bold">
                分享{EVENT.shortName}
              </h3>

              <div className="mt-4 flex justify-center">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt="网站二维码"
                    className="h-48 w-48 rounded-lg"
                  />
                ) : (
                  <div className="flex h-48 w-48 items-center justify-center rounded-lg bg-background-elevated text-xs text-foreground-muted">
                    生成中…
                  </div>
                )}
              </div>

              <p className="mt-3 break-all text-xs text-foreground-muted">
                {SITE_URL}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 rounded-full border border-border py-2 text-sm font-medium text-foreground transition-colors hover:border-accent-purple-light hover:text-accent-purple-light"
                >
                  {copied ? "已复制" : "复制链接"}
                </button>
                {canNativeShare && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="flex-1 rounded-full bg-gradient-to-r from-accent-purple to-accent-green py-2 text-sm font-semibold text-white"
                  >
                    分享...
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 text-xs text-foreground-muted underline underline-offset-2"
              >
                关闭
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
