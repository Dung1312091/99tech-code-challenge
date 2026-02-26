import { useCallback, useState } from "react";
import type { ToastData, ToastVariant } from "@/shares/components/ui/toast";

let nextId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = useCallback((message: string, variant: ToastVariant) => {
    setToasts((prev) => [...prev, { id: ++nextId, message, variant }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, show, dismiss };
}
