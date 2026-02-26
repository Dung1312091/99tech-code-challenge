import { cn } from "@/shares/utils/cn";

interface SwapArrowsIconProps extends React.ComponentProps<"svg"> {}

export function SwapArrowsIcon({ className, ...props }: SwapArrowsIconProps) {
  return (
    <svg
      className={cn("w-5 h-5", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  );
}
