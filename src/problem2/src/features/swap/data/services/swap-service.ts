import { SWAP_SIMULATION_DELAY } from "../../constants";
import { SwapRequest, SwapResponse } from "../../types/swap";

/** Mock swap service — simulates backend API for token swaps */
class SwapService {
  async submit(request: SwapRequest): Promise<SwapResponse> {
    await new Promise((resolve) => setTimeout(resolve, SWAP_SIMULATION_DELAY));

    return {
      txHash: `0x${crypto.randomUUID().replace(/-/g, "")}`,
      fromCurrency: request.fromCurrency,
      toCurrency: request.toCurrency,
      fromAmount: request.amount,
      toAmount: 0,
    };
  }
}

export const swapService = new SwapService();
