import { useMemo, useState } from "react";
import type { Token } from "../types";
import { Button } from "@/shares/components/ui/button";
import { Modal } from "@/shares/components/ui/modal";
import { SearchInput } from "@/shares/components/ui/search-input";
import { TokenIcon } from "@/shares/components/ui/token-icon";
import { CheckIcon } from "@/shares/icons";
import { YOUR_TOKEN_SYMBOLS } from "../constants";

const RECENT_KEY = "swap-recent-tokens";
const MAX_RECENT = 5;

function loadRecentIds(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

interface TokenSelectModalProps {
  tokens: Token[];
  selected: Token | null;
  onSelect: (token: Token) => void;
  onClose: () => void;
}

export function TokenSelectModal({
  tokens,
  selected,
  onSelect,
  onClose,
}: TokenSelectModalProps) {
  const [search, setSearch] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>(loadRecentIds);

  const filtered = useMemo(() => {
    if (!search.trim()) return tokens;
    const q = search.toLowerCase();
    return tokens.filter((t) => t.currency.toLowerCase().includes(q));
  }, [tokens, search]);

  const yourTokens = useMemo(
    () => filtered.filter((t) => YOUR_TOKEN_SYMBOLS.includes(t.currency)),
    [filtered],
  );

  const recentTokens = useMemo(
    () =>
      recentIds
        .map((id) => filtered.find((t) => t.currency === id))
        .filter(
          (t): t is Token =>
            t !== undefined && !YOUR_TOKEN_SYMBOLS.includes(t.currency),
        ),
    [filtered, recentIds],
  );

  const allTokens = useMemo(() => {
    const exclude = new Set([...YOUR_TOKEN_SYMBOLS, ...recentIds]);
    return filtered.filter((t) => !exclude.has(t.currency));
  }, [filtered, recentIds]);

  function handleSelect(token: Token) {
    if (!YOUR_TOKEN_SYMBOLS.includes(token.currency)) {
      const updated = [
        token.currency,
        ...recentIds.filter((id) => id !== token.currency),
      ].slice(0, MAX_RECENT);
      setRecentIds(updated);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      } catch {}
    }
    onSelect(token);
    onClose();
  }

  return (
    <Modal
      title="Select a token"
      onClose={onClose}
      className="w-full max-w-md h-[80vh] flex flex-col"
    >
      <div className="px-5 pb-3">
        <SearchInput
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder="Search by name or symbol..."
          autoFocus
        />
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
        {filtered.length === 0 ? (
          <p className="text-center text-content-tertiary py-8 text-sm">
            No tokens found
          </p>
        ) : (
          <>
            <TokenCategory
              label="Your Tokens"
              tokens={yourTokens}
              selected={selected}
              onSelect={handleSelect}
            />
            <TokenCategory
              label="Recent Searches"
              tokens={recentTokens}
              selected={selected}
              onSelect={handleSelect}
            />
            <TokenCategory
              label="All Tokens"
              tokens={allTokens}
              selected={selected}
              onSelect={handleSelect}
            />
          </>
        )}
      </div>
    </Modal>
  );
}

function TokenCategory({
  label,
  tokens,
  selected,
  onSelect,
}: {
  label: string;
  tokens: Token[];
  selected: Token | null;
  onSelect: (token: Token) => void;
}) {
  if (tokens.length === 0) return null;

  return (
    <div>
      <div className="sticky top-0 z-10 bg-surface-secondary/90 backdrop-blur-md px-5 py-2 border-b border-line-secondary">
        <span className="text-xs font-semibold text-content-secondary uppercase tracking-wider">
          {label}
        </span>
      </div>
      <ul>
        {tokens.map((token) => (
          <li key={token.currency}>
            <Button
              variant="unstyled"
              onClick={() => onSelect(token)}
              className={`flex items-center gap-3 w-full px-5 py-3 text-left transition-colors cursor-pointer
                hover:bg-surface-primary/60
                ${selected?.currency === token.currency ? "bg-brand/10 text-brand-muted shadow-glow-brand-sm" : ""}`}
            >
              <TokenIcon token={token} size="md" />
              <span className="font-medium text-sm">{token.currency}</span>
              {selected?.currency === token.currency && (
                <CheckIcon className="ml-auto text-brand-subtle" />
              )}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
