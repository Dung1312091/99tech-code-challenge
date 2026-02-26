interface AppErrorProps extends React.ComponentProps<"div"> {
  error: string;
}
export function AppError({ error, ...props }: AppErrorProps) {
  return (
    <div className="text-center" {...props}>
      <p className="text-feedback-error text-lg">Failed to load token prices</p>
      {error && <p className="text-content-tertiary text-sm mt-1">{error}</p>}
    </div>
  );
}
