import { useQuery } from "@tanstack/react-query";
import { fetchTokens } from "../services/token-service";

const TOKENS_QUERY_KEY = ["tokens"] as const;

export function useTokensQuery() {
  return useQuery({
    queryKey: TOKENS_QUERY_KEY,
    queryFn: ({ signal }) => fetchTokens(signal),
    staleTime: 60_000,
  });
}
