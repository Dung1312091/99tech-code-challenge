import { Spinner } from "../components/ui/spinner";

interface AppLoadingProps extends React.ComponentProps<"div"> {
  message: string;
}

export function AppLoading({ message, ...props }: AppLoadingProps) {
  return (
    <div className="flex flex-col items-center gap-3" {...props}>
      <Spinner className="h-8 w-8 text-brand-subtle" />
      {message && <p className="text-content-secondary">{message}</p>}
    </div>
  );
}
