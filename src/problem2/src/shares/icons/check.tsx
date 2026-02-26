import { cn } from "@/shares/utils/cn";

interface CheckIconProps extends React.ComponentProps<"svg"> {}

export function CheckIcon({ className, ...props }: CheckIconProps) {
  return (
    <svg
      className={cn("w-4 h-4", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
