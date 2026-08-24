"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { EVENT } from "@/lib/data";

const SITE_URL = "https://sic-gymkana.vercel.app";

const X_SHARE_URL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
  SITE_URL
)}&text=${encodeURIComponent(EVENT.name)}`;
const FACEBOOK_SHARE_URL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  SITE_URL
)}`;

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

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

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

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

  const handleWeChatShare = () => {
    showToast("请使用微信「扫一扫」上方二维码分享");
  };

  const handleInstagramShare = async () => {
    await handleCopy();
    showToast("链接已复制，可粘贴到 Instagram 简介或私信");
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

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs text-foreground-muted">分享到</p>
                <div className="mt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleWeChatShare}
                    aria-label="分享到微信"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent-purple-light hover:text-accent-purple-light"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M8.5 3C4.36 3 1 5.79 1 9.25c0 2 1.09 3.77 2.8 4.93-.14.5-.5 1.76-.57 2.03-.09.33.12.33.25.24.1-.07 1.62-1.07 2.28-1.5.55.15 1.13.25 1.74.25.2 0 .4-.01.6-.03A5.6 5.6 0 0 1 8 13.4c0-3.15 3.02-5.7 6.75-5.7.23 0 .46.01.68.03C14.85 4.9 11.98 3 8.5 3z" />
                      <path d="M16.25 8.7c-3.45 0-6.25 2.28-6.25 5.1 0 2.81 2.8 5.1 6.25 5.1.53 0 1.04-.06 1.53-.16.55.36 1.85 1.2 1.94 1.26.11.07.29.07.22-.21-.06-.23-.36-1.3-.48-1.74A4.9 4.9 0 0 0 22.5 13.8c0-2.82-2.8-5.1-6.25-5.1z" />
                    </svg>
                  </button>

                  <a
                    href={X_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="分享到 X"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent-purple-light hover:text-accent-purple-light"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  <a
                    href={FACEBOOK_SHARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="分享到 Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent-purple-light hover:text-accent-purple-light"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M22 12a10 10 0 1 0-11.6 9.88v-6.99H7.9V12h2.5V9.8c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12" />
                    </svg>
                  </a>

                  <button
                    type="button"
                    onClick={handleInstagramShare}
                    aria-label="分享到 Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-accent-purple-light hover:text-accent-purple-light"
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
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </button>
                </div>
                {toast && (
                  <p className="mt-2 text-xs text-accent-green-light">
                    {toast}
                  </p>
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
