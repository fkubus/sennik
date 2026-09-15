"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { SymbolSummary } from "@/lib/content/symbols";

interface SearchBoxProps {
  symbols: SymbolSummary[];
  placeholder?: string;
  className?: string;
}

export function SearchBox({
  symbols,
  placeholder = "Wpisz symbol, np. woda, zęby, latanie…",
  className,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const fuse = useMemo(
    () =>
      new Fuse(symbols, {
        keys: ["name"],
        threshold: 0.35,
      }),
    [symbols],
  );

  const results = useMemo(() => {
    if (query.trim().length === 0) return [];
    return fuse.search(query, { limit: 8 }).map((result) => result.item);
  }, [fuse, query]);

  const showSuggestions = isFocused && query.trim().length > 0;

  return (
    <div className={cn("relative w-full max-w-xl", className)}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const first = results[0];
          if (first) router.push(`/sennik/${first.slug}`);
        }}
      >
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder={placeholder}
            className="h-12 pl-9 text-base"
            aria-label="Szukaj symbolu sennego"
            autoComplete="off"
          />
        </div>
      </form>

      {showSuggestions && (
        <ul className="bg-popover border-border absolute z-20 mt-2 w-full overflow-hidden rounded-lg border shadow-lg">
          {results.length === 0 ? (
            <li className="text-muted-foreground px-4 py-3 text-sm">
              Nie znaleziono symbolu „{query}”.
            </li>
          ) : (
            results.map((symbol) => (
              <li key={symbol.slug}>
                <Link
                  href={`/sennik/${symbol.slug}`}
                  className="hover:bg-accent hover:text-accent-foreground flex flex-col px-4 py-2.5 text-sm transition-colors"
                >
                  <span className="font-medium">{symbol.name}</span>
                  {symbol.excerpt && (
                    <span className="text-muted-foreground line-clamp-1 text-xs">
                      {symbol.excerpt}
                    </span>
                  )}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
