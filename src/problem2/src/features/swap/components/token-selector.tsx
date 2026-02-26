import type { ChangeEventHandler } from "react";
import type { Token } from "../types";
import { AmountInput } from "@/shares/components/ui/amount-input";
import { Button } from "@/shares/components/ui/button";
import { TokenIcon } from "@/shares/components/ui/token-icon";
import { ChevronDownIcon } from "@/shares/icons";
import { formatUsd } from "@/shares/utils";

interface QuickAction {
  label: string;
  onClick: () => void;
}

interface TokenSelectorProps {
  label: string;
  token: Token | null;
  amount: string;
  usd: number | null;
  onTokenClick: () => void;
  onAmountChange: ChangeEventHandler<HTMLInputElement>;
  quickActions?: QuickAction[];
}

export function TokenSelector({
  label,
  token,
  amount,
  usd,
  onTokenClick,
  onAmountChange,
  quickActions,
}: TokenSelectorProps) {
  return (
    <div className="bg-surface-secondary/40 rounded-xl p-4 border border-line-primary/30 shadow-inner-glow transition-colors hover:border-line-primary/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-content-tertiary uppercase tracking-wide">
          {label}
        </span>
        {quickActions && token && (
          <div className="flex items-center gap-1">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="unstyled"
                onClick={action.onClick}
                className="text-xs text-brand-subtle hover:text-brand-muted cursor-pointer px-1.5 py-0.5 rounded bg-brand-subtle/10 hover:bg-brand-subtle/20 transition-colors"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          onClick={onTokenClick}
          className="flex items-center gap-2 px-3 py-2.5 shrink-0"
        >
          {token ? (
            <>
              <TokenIcon token={token} size="md" />
              <span className="font-semibold">{token.currency}</span>
            </>
          ) : (
            <span className="text-content-secondary text-sm">Select token</span>
          )}
          <ChevronDownIcon className="text-content-secondary" />
        </Button>
        <div className="flex-1 text-right">
          <AmountInput value={amount} onChange={onAmountChange} />
          <p className="text-xs text-content-tertiary mt-1 min-h-[16px]">
            {usd !== null ? formatUsd(usd) : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
