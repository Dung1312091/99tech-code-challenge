import { useState } from "react";
import type { Token } from "../types";
import { SWAP_ERRORS } from "../constants";
import { useSwapMutation } from "../data";

interface UseSwapSubmitParams {
  fromToken: Token | null;
  toToken: Token | null;
  displayFrom: string;
  clearAmounts: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export interface UseSwapSubmitReturn {
  isValid: boolean;
  swapping: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
}

export function useSwapSubmit({
  fromToken,
  toToken,
  displayFrom,
  clearAmounts,
  onSuccess,
  onError,
}: UseSwapSubmitParams): UseSwapSubmitReturn {
  const [validationError, setValidationError] = useState<string | null>(null);
  const swapMutation = useSwapMutation();

  function validate(): string | null {
    if (!fromToken || !toToken) return SWAP_ERRORS.SELECT_BOTH_TOKENS;
    if (fromToken.currency === toToken.currency)
      return SWAP_ERRORS.SELECT_DIFFERENT_TOKENS;
    const parsed = parseFloat(displayFrom);
    if (!Number.isFinite(parsed) || parsed <= 0)
      return SWAP_ERRORS.ENTER_VALID_AMOUNT;
    return null;
  }

  const currentValidation = validate();
  const isValid = currentValidation === null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setValidationError(currentValidation);
      return;
    }
    setValidationError(null);
    try {
      await swapMutation.mutateAsync({
        fromCurrency: fromToken!.currency,
        toCurrency: toToken!.currency,
        amount: parseFloat(displayFrom),
      });
      onSuccess();
      clearAmounts();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Swap failed");
    }
  }

  const error = validationError ?? (swapMutation.error?.message || null);

  return {
    isValid,
    swapping: swapMutation.isPending,
    error,
    handleSubmit,
  };
}
