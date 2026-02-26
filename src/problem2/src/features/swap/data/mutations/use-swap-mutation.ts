import { useMutation } from "@tanstack/react-query";
import { swapService } from "../services/swap-service";
import { SwapRequest, SwapResponse } from "../../types/swap";

export function useSwapMutation() {
  return useMutation<SwapResponse, Error, SwapRequest>({
    mutationFn: async (request) => await swapService.submit(request),
  });
}
