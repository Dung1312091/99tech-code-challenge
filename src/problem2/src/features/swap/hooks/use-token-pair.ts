import type { ChangeEventHandler } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ActiveSide, Token } from "../types";
import { SIMULATED_BALANCE, YOUR_TOKEN_SYMBOLS } from "../constants";
import { formatAmount, isValidDecimalInput } from "@/shares/utils";

export interface UseTokenPairReturn {
  fromToken: Token | null;
  toToken: Token | null;
  setFromToken: (token: Token | null) => void;
  setToToken: (token: Token | null) => void;
  displayFrom: string;
  displayTo: string;
  fromUsd: number | null;
  toUsd: number | null;
  exchangeRate: number | null;
  handleFromChange: ChangeEventHandler<HTMLInputElement>;
  handleToChange: ChangeEventHandler<HTMLInputElement>;
  handleQuickAction: (percent: number) => void;
  handleSwapDirection: () => void;
  clearAmounts: () => void;
}

function computeConvertedAmount({
  amount,
  source,
  target,
}: {
  amount: string;
  source: Token | null;
  target: Token | null;
}): number | null {
  const parsed = parseFloat(amount);
  if (!source || !target || !Number.isFinite(parsed) || parsed <= 0)
    return null;
  return parsed * (source.price / target.price);
}

function getDisplayValue({
  manualAmount,
  computed,
  isManualSide,
}: {
  manualAmount: string;
  computed: number | null;
  isManualSide: boolean;
}): string {
  if (isManualSide) return manualAmount;
  return computed !== null ? formatAmount(computed) : "";
}

function computeUsdValue({
  manualAmount,
  computed,
  token,
  isManualSide,
}: {
  manualAmount: string;
  computed: number | null;
  token: Token | null;
  isManualSide: boolean;
}): number | null {
  const val = isManualSide ? parseFloat(manualAmount) : computed;
  if (!token || val == null || !Number.isFinite(val) || val <= 0) return null;
  return val * token.price;
}

export function useTokenPair(tokens: Token[]): UseTokenPairReturn {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);

  // Set default tokens from "Your Tokens" when list first loads
  useEffect(() => {
    if (tokens.length >= 2 && !fromToken && !toToken) {
      const yourTokens = tokens.filter((t) =>
        YOUR_TOKEN_SYMBOLS.includes(t.currency),
      );
      const defaults = yourTokens.length >= 2 ? yourTokens : tokens;
      setFromToken(defaults[0] ?? null);
      setToToken(defaults[1] ?? null);
    }
  }, [tokens, fromToken, toToken]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [activeSide, setActiveSide] = useState<ActiveSide>("from");

  const computedFrom = useMemo(
    () =>
      activeSide === "to"
        ? computeConvertedAmount({
            amount: toAmount,
            source: toToken,
            target: fromToken,
          })
        : null,
    [activeSide, toAmount, fromToken, toToken],
  );

  const computedTo = useMemo(
    () =>
      activeSide === "from"
        ? computeConvertedAmount({
            amount: fromAmount,
            source: fromToken,
            target: toToken,
          })
        : null,
    [activeSide, fromAmount, fromToken, toToken],
  );

  const displayFrom = getDisplayValue({
    manualAmount: fromAmount,
    computed: computedFrom,
    isManualSide: activeSide === "from",
  });
  const displayTo = getDisplayValue({
    manualAmount: toAmount,
    computed: computedTo,
    isManualSide: activeSide === "to",
  });

  const fromUsd = useMemo(
    () =>
      computeUsdValue({
        manualAmount: fromAmount,
        computed: computedFrom,
        token: fromToken,
        isManualSide: activeSide === "from",
      }),
    [activeSide, fromAmount, computedFrom, fromToken],
  );

  const toUsd = useMemo(
    () =>
      computeUsdValue({
        manualAmount: toAmount,
        computed: computedTo,
        token: toToken,
        isManualSide: activeSide === "to",
      }),
    [activeSide, toAmount, computedTo, toToken],
  );

  // TODO: Get real exchange rate
  const exchangeRate = useMemo(() => {
    if (!fromToken || !toToken) return null;
    return fromToken.price / toToken.price;
  }, [fromToken, toToken]);

  function makeAmountHandler(
    setter: (v: string) => void,
    side: ActiveSide,
  ): ChangeEventHandler<HTMLInputElement> {
    return (e) => {
      if (isValidDecimalInput(e.target.value)) {
        setter(e.target.value);
        setActiveSide(side);
      }
    };
  }

  const handleFromChange = makeAmountHandler(setFromAmount, "from");
  const handleToChange = makeAmountHandler(setToAmount, "to");

  function handleQuickAction(percent: number) {
    const val = (SIMULATED_BALANCE * percent) / 100;
    setFromAmount(String(val));
    setActiveSide("from");
  }

  const handleSwapDirection = useCallback(() => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(displayTo);
    setToAmount(displayFrom);
  }, [fromToken, toToken, displayFrom, displayTo]);

  function clearAmounts() {
    setFromAmount("");
    setToAmount("");
  }

  return {
    fromToken,
    toToken,
    setFromToken,
    setToToken,
    displayFrom,
    displayTo,
    fromUsd,
    toUsd,
    exchangeRate,
    handleFromChange,
    handleToChange,
    handleQuickAction,
    handleSwapDirection,
    clearAmounts,
  };
}
