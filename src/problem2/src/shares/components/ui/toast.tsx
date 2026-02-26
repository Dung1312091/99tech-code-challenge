import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shares/utils/cn";
import { CheckIcon, CloseIcon } from "@/shares/icons";

export type ToastVariant = "success" | "error";

export interface ToastData {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: number) => void;
  duration: number;
}

const variantStyles: Record<ToastVariant, string> = {
  success:
    "border-feedback-success/30 bg-feedback-success/10 text-feedback-success",
  error: "border-feedback-error/30 bg-feedback-error/10 text-feedback-error",
};

function ToastItem({ toast, onDismiss, duration }: ToastItemProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), duration - 300);
    const remove = setTimeout(() => onDismiss(toast.id), duration);
    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, [toast.id, onDismiss, duration]);

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg text-sm font-medium transition-all duration-300",
        variantStyles[toast.variant],
        exiting ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
      )}
    >
      {toast.variant === "success" ? (
        <CheckIcon className="w-4 h-4 shrink-0" />
      ) : (
        <CloseIcon className="w-4 h-4 shrink-0" />
      )}
      <span className="text-content-primary">{toast.message}</span>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
  duration?: number;
}

export function ToastContainer({
  toasts,
  onDismiss,
  duration = 3000,
}: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          toast={t}
          onDismiss={onDismiss}
          duration={duration}
        />
      ))}
    </div>,
    document.body,
  );
}
