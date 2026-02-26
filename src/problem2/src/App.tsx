import { useTokensQuery } from "@/shares/data/tokens/queries/use-tokens-query";
import { SwapForm } from "@/features/swap/components/swap-form";
import { AppError, AppLoading } from "./shares/components";

export function App() {
  const { data: tokens, isLoading, error } = useTokensQuery();

  const renderContent = () => {
    if (isLoading) return <AppLoading message="Loading tokens..." />;
    if (error) return <AppError error={error.message} />;
    return <SwapForm tokens={tokens ?? []} />;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-page-from via-page-via to-page-to text-content-primary flex items-start justify-center pt-20 p-4 relative overflow-hidden">
      <div className="ambient-orb w-[500px] h-[500px] bg-brand/20 -top-48 -left-24 animate-pulse-glow" />
      <div className="ambient-orb w-[400px] h-[400px] bg-[#5b06ba]/15 -bottom-32 -right-20 animate-pulse-glow [animation-delay:2s]" />
      <div className="ambient-orb w-[300px] h-[300px] bg-brand-subtle/10 top-1/3 right-1/4 animate-pulse-glow [animation-delay:3s]" />
      {renderContent()}
    </div>
  );
}
