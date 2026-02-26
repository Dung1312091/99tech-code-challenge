import type { ComponentProps } from "react";
import { cn } from "@/shares/utils/cn";

const variants = {
  default:
    "w-full bg-surface-primary border border-line-primary rounded-xl px-4 py-2.5 text-sm outline-none placeholder-content-tertiary focus:border-line-focus focus-glow transition-all",
  transparent:
    "w-full bg-transparent text-2xl font-semibold outline-none placeholder-content-muted text-right",
  unstyled: "",
} as const;

type InputVariant = keyof typeof variants;

interface InputProps extends ComponentProps<"input"> {
  variant?: InputVariant;
}

export function Input({
  variant = "default",
  className = "",
  onChange,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(variants[variant], className)}
      onChange={onChange}
      {...props}
    />
  );
}
