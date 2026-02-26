import type { ReactNode } from "react";
import { cn } from "@/shares/utils/cn";

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Dropdown({
  open,
  onClose,
  children,
  className = "",
}: DropdownProps) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className={cn(
          "absolute right-0 top-full mt-2 z-50 bg-surface-primary/90 backdrop-blur-xl border border-line-primary/50 rounded-xl shadow-glow-brand-sm p-4 animate-slide-up",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
