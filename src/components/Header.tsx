import Link from "next/link";
import { EVENT, NAV_LINKS } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#home" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-green font-display text-lg font-bold text-white">
            13
          </span>
          <span className="font-display text-lg font-semibold tracking-wide">
            {EVENT.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#registration"
          className="rounded-full bg-gradient-to-r from-accent-purple to-accent-green px-5 py-2 text-sm font-medium text-white shadow-lg shadow-accent-green/20 transition-transform hover:scale-105"
        >
          立即报名
        </a>
      </div>
    </header>
  );
}
