import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./button";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function IconButton({
  children,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <Button variant="ghost" className={className} {...props}>
      {children}
    </Button>
  );
}
