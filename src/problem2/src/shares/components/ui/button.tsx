import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shares/utils/cn";

const variants = {
  primary:
    "w-full py-3.5 rounded-xl font-semibold text-lg transition-all duration-200 btn-gradient-brand active:scale-[0.98] disabled:text-content-tertiary disabled:cursor-not-allowed disabled:active:scale-100",
  ghost: "text-content-secondary hover:text-content-primary transition-colors cursor-pointer",
  secondary:
    "bg-surface-tertiary/50 hover:bg-surface-tertiary rounded-xl transition-colors cursor-pointer",
  unstyled: "",
} as const;

type ButtonVariant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = "unstyled",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
