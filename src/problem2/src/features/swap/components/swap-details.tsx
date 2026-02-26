import { useState } from "react";
import type { Token } from "../types";
import { Button } from "@/shares/components/ui/button";
import { ChevronDownIcon } from "@/shares/icons";
import { formatAmount, formatUsd } from "@/shares/utils";

interface SwapDetailsProps {
  fromToken: Token;
  toToken: Token;
  exchangeRate: number;
  slippage: number;
  fromAmount: number;
  toAmount: number;
}

export function SwapDetails({
  fromToken,
  toToken,
  exchangeRate,
  slippage,
  fromAmount,
  toAmount,
}: SwapDetailsProps) {
  const [expanded, setExpanded] = useState(false);

  const minimumReceived = toAmount * (1 - slippage / 100);
  const priceImpact = 0.01; // TODO: get from DEX router
  const networkFee = 0.5; // TODO: get from DEX router

  return (
    <div className="mt-4">
      <Button
        variant="unstyled"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-xs text-content-secondary hover:text-content-primary transition-colors cursor-pointer py-2 px-1"
      >
        <span>
          1 {fromToken.currency} = {formatAmount(exchangeRate)}{" "}
          {toToken.currency}
        </span>
        <ChevronDownIcon
          className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </Button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="bg-surface-secondary/30 rounded-xl p-3 space-y-2.5 text-xs border border-line-primary/20 shadow-inner-glow">
            <DetailRow
              label="Price"
              value={`1 ${fromToken.currency} = ${formatAmount(exchangeRate)} ${toToken.currency}`}
            />
            <DetailRow
              label="Inverse Price"
              value={`1 ${toToken.currency} = ${formatAmount(1 / exchangeRate)} ${fromToken.currency}`}
            />
            <DetailRow
              label="You pay"
              value={`${formatAmount(fromAmount)} ${fromToken.currency} (${formatUsd(fromAmount * fromToken.price)})`}
            />
            <DetailRow
              label="You receive"
              value={`${formatAmount(toAmount)} ${toToken.currency} (${formatUsd(toAmount * toToken.price)})`}
            />
            <div className="border-t border-line-secondary pt-2" />
            <DetailRow label="Slippage Tolerance" value={`${slippage}%`} />
            <DetailRow
              label="Minimum Received"
              value={`${formatAmount(minimumReceived)} ${toToken.currency}`}
            />
            <DetailRow
              label="Price Impact"
              value={`~${priceImpact}%`}
              valueClass="text-feedback-success"
            />
            <DetailRow
              label="Network Fee"
              value={`~${formatUsd(networkFee)}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-start justify-between">
      <span className="text-content-tertiary">{label}</span>
      <div className="text-right">
        <span className={valueClass ?? "text-content-secondary"}>{value}</span>
        {sub && <p className="text-content-tertiary mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
