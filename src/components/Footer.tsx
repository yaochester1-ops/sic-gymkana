import { EVENT } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-foreground-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} {EVENT.name}
        </span>
        <span>{EVENT.season} · 版权所有</span>
      </div>
    </footer>
  );
}
