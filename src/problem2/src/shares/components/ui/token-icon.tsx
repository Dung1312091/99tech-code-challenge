import { useState } from "react";
import { cn } from "@/shares/utils/cn";

interface TokenIconProps {
  token: { currency: string; icon: string };
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-5 h-5 text-[10px]",
  md: "w-7 h-7 text-xs",
  lg: "w-9 h-9 text-sm",
};

export function TokenIcon({ token, size = "md" }: TokenIconProps) {
  const [failed, setFailed] = useState(false);
  const cls = sizeMap[size];

  if (failed) {
    return (
      <div
        className={cn(
          cls,
          "rounded-full bg-brand flex items-center justify-center font-bold shrink-0",
        )}
      >
        {token.currency[0]}
      </div>
    );
  }

  return (
    <img
      src={token.icon}
      alt={token.currency}
      className={cn(cls, "rounded-full shrink-0")}
      onError={() => setFailed(true)}
    />
  );
}
