export interface SwapRequest {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export interface SwapResponse {
  txHash: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
}
