import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/shares/utils/cn";
import { IconButton } from "./icon-button";
import { CloseIcon } from "@/shares/icons";

interface ModalProps {
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ title, onClose, children, className }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-surface-overlay/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        className={cn(
          "bg-surface-secondary/90 backdrop-blur-xl border border-line-primary/40 rounded-2xl shadow-glow-brand overflow-hidden animate-slide-up",
          className,
        )}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <IconButton onClick={onClose} className="p-1" aria-label="Close">
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
