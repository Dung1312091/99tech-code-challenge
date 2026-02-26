import { cn } from "@/shares/utils/cn";

interface ChevronDownIconProps extends React.ComponentProps<"svg"> {}

export function ChevronDownIcon({ className, ...props }: ChevronDownIconProps) {
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
