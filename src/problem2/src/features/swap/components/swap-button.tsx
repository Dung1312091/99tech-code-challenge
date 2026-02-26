import { Button } from "@/shares/components/ui/button";
import { Spinner } from "@/shares/components/ui/spinner";

interface SwapButtonProps {
  loading: boolean;
  disabled: boolean;
}

export function SwapButton({ loading, disabled }: SwapButtonProps) {
  return (
    <Button variant="primary" type="submit" disabled={disabled || loading}>
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Spinner />
          Swapping...
        </span>
      ) : (
        "Confirm Swap"
      )}
    </Button>
  );
}
