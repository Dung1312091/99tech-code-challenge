import React, { useMemo } from "react";
import { BoxProps } from "@chakra-ui/react"; // Assuming `BoxProps` is imported from chakra-ui
import { useWalletBalances, usePrices } from "@/hooks"; // Assuming `useWalletBalances` and `usePrices` are imported from hooks
import { WalletRow } from "@/component/wallet"; // Assuming `WalletRow` is imported from wallet component

// Fix: use union type so only known blockchains are accepted
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; // Fix: Add blockchain property
}

// Refactor: extend WalletBalance instead of copy-pasting its fields
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {} //

const FALLBACK_PRIORITY = -99;

// Moved outside component — no reason to recreate this on every render.
// Switched from switch/case to a map for cleaner lookup.
const blockchainPriorities: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// Fix: any -> Blockchain type
function getPriority(blockchain: Blockchain): number {
  return blockchainPriorities[blockchain] ?? FALLBACK_PRIORITY;
}

export const WalletPage: React.FC<Props> = (props) => {
  // Remove redundant children
  // Add rowClassName to allow custom styling of rows
  const { rowClassName, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Combine filter + sort + format into one memoized block.
  // Remove formattedBalances

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // Fix 1: original used `lhsPriority` which doesn't exist (should be `balancePriority`)
        // Fix 2: original had `balance.amount <= 0` which is backwards
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > FALLBACK_PRIORITY && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority !== rightPriority) return rightPriority - leftPriority;
        return rhs.amount - lhs.amount; // If priorities are equal, sort by amount descending
      })
      .map(
        (balance): FormattedWalletBalance => ({
          ...balance,
          formatted: balance.amount.toFixed(6), // Using toFixed(6) to format the amount to be consistent with the problem2
        }),
      );
  }, [balances]); // Fix: removed `prices` — it wasn't used in filter/sort logic

  return (
    <div {...rest}>
      {sortedBalances.map((balance: FormattedWalletBalance) => {
        const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
        return (
          <WalletRow
            className={rowClassName}
            key={`${balance.blockchain}-${balance.currency}`} // Fix: don't use array index as key
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};
