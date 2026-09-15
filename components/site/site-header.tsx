import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/sennik", label: "Sennik" },
  { href: "/blog", label: "Blog" },
  { href: "/interpretacja", label: "Interpretacja AI" },
];

export function SiteHeader() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-30 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-primary">Sen</span>nik
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm">
          <Link href="/interpretacja">Zinterpretuj sen</Link>
        </Button>
      </div>
    </header>
  );
}
