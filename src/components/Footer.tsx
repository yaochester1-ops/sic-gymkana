import Link from "next/link";
import { EVENT, NAV_LINKS } from "@/lib/data";

const LINK_COLUMNS = [
  {
    title: "赛事",
    links: NAV_LINKS.filter((l) =>
      ["/#venue", "/#prize-pool", "/#rules"].includes(l.href)
    ),
  },
  {
    title: "参与",
    links: NAV_LINKS.filter((l) => ["/#drivers", "/registration"].includes(l.href)),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 pb-8 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-green font-display text-xs font-bold text-white">
              SIC
            </span>
            <span className="font-display text-base font-semibold">
              {EVENT.shortName}
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-foreground-muted">
            {EVENT.tagline} · {EVENT.season}
          </p>
        </div>

        {LINK_COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
              {col.title}
            </p>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-foreground-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} {EVENT.name}
        </span>
        <span>{EVENT.season} · 版权所有</span>
      </div>
    </footer>
  );
}
