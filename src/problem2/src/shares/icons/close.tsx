import { cn } from "@/shares/utils/cn";

interface CloseIconProps extends React.ComponentProps<"svg"> {}

export function CloseIcon({ className, ...props }: CloseIconProps) {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
