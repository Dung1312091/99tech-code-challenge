import { useState } from "react";
import type { Token } from "../types";
import { DEFAULT_SLIPPAGE } from "../constants";
import { Button } from "@/shares/components/ui/button";
import { ToastContainer } from "@/shares/components/ui/toast";
import { SwapArrowsIcon } from "@/shares/icons";
import { useToast } from "@/shares/hooks/use-toast";
import { useTokenPair } from "../hooks/use-token-pair";
import { useSwapSubmit } from "../hooks/use-swap-submit";
import { useTokenSelectModal } from "../hooks/use-token-select-modal";
import { TokenSelectModal } from "./token-select-modal";
import { SwapButton } from "./swap-button";
import { SlippageSetting } from "./slippage-setting";
import { SwapDetails } from "./swap-details";
import { TokenSelector } from "./token-selector";

interface SwapFormProps {
  tokens: Token[];
}

export function SwapForm({ tokens }: SwapFormProps) {
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const pair = useTokenPair(tokens);
  const toast = useToast();
  const submit = useSwapSubmit({
    ...pair,
    onSuccess: () => toast.show("Swap completed successfully!", "success"),
    onError: (msg) => toast.show(msg, "error"),
  });
  const modal = useTokenSelectModal(pair);

  return (
    <>
      <form
        onSubmit={submit.handleSubmit}
        className="w-full max-w-lg bg-surface-primary/60 backdrop-blur-xl border-glow rounded-2xl p-5 shadow-glow-brand relative z-10"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold font-heading tracking-wide">Swap</h2>
          <SlippageSetting slippage={slippage} onSlippageChange={setSlippage} />
        </div>

        <div className="space-y-1">
          <TokenSelector
            label="You pay"
            token={pair.fromToken}
            amount={pair.displayFrom}
            usd={pair.fromUsd}
            onTokenClick={() => modal.openModal("from")}
            onAmountChange={pair.handleFromChange}
            quickActions={[
              { label: "50%", onClick: () => pair.handleQuickAction(50) },
              { label: "Max", onClick: () => pair.handleQuickAction(100) },
            ]}
          />

          <div className="flex justify-center absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Button
              variant="unstyled"
              onClick={pair.handleSwapDirection}
              className="bg-surface-tertiary hover:bg-brand/20 border-4 border-surface-primary/80 rounded-xl p-2 transition-all hover:rotate-180 duration-300 cursor-pointer hover:shadow-glow-brand-sm"
              title="Swap direction"
            >
              <SwapArrowsIcon />
            </Button>
          </div>

          <TokenSelector
            label="You receive"
            token={pair.toToken}
            amount={pair.displayTo}
            usd={pair.toUsd}
            onTokenClick={() => modal.openModal("to")}
            onAmountChange={pair.handleToChange}
          />
          <SwapButton loading={submit.swapping} disabled={!submit.isValid} />
        </div>

        {pair.exchangeRate !== null && pair.fromToken && pair.toToken && (
          <SwapDetails
            fromToken={pair.fromToken}
            toToken={pair.toToken}
            exchangeRate={pair.exchangeRate}
            slippage={slippage}
            fromAmount={parseFloat(pair.displayFrom) || 0}
            toAmount={parseFloat(pair.displayTo) || 0}
          />
        )}
      </form>

      {modal.modalFor !== null && (
        <TokenSelectModal
          tokens={tokens}
          selected={modal.modalFor === "from" ? pair.fromToken : pair.toToken}
          onSelect={modal.handleModalSelect}
          onClose={modal.closeModal}
        />
      )}

      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />
    </>
  );
}
