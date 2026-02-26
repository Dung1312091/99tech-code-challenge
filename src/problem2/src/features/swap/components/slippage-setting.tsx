import { Button } from "@/shares/components/ui/button";
import { Dropdown } from "@/shares/components/ui/dropdown";
import { IconButton } from "@/shares/components/ui/icon-button";
import { Input } from "@/shares/components/ui/input";
import { GearIcon } from "@/shares/icons";
import { isValidDecimalInput } from "@/shares/utils";
import { ChangeEvent, useState } from "react";

const DEFAULT_PRESETS = [0.5, 1, 2];

interface SlippageSettingProps {
  slippage: number;
  onSlippageChange: (value: number) => void;
  slippagePresets?: number[];
}

export function SlippageSetting({
  slippage,
  onSlippageChange,
  slippagePresets = DEFAULT_PRESETS,
}: SlippageSettingProps) {
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const isCustom = !slippagePresets.includes(slippage);

  function handleCustomChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isValidDecimalInput(value)) {
      setCustomInput(value);
      const parsed = parseFloat(value);
      if (Number.isFinite(parsed) && parsed > 0 && parsed <= 50) {
        onSlippageChange(parsed);
      }
    }
  }

  function handlePresetClick(preset: number) {
    onSlippageChange(preset);
    setCustomInput("");
  }

  return (
    <div className="relative">
      <IconButton
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-surface-tertiary/50"
        title="Slippage settings"
      >
        <GearIcon />
      </IconButton>

      <Dropdown open={open} onClose={() => setOpen(false)} className="w-80">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Slippage Tolerance</span>
          <span className="text-xs text-content-secondary">{slippage}%</span>
        </div>

        <div className="flex items-center gap-2">
          {slippagePresets.map((preset) => (
            <Button
              key={preset}
              variant="unstyled"
              onClick={() => handlePresetClick(preset)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${
                  slippage === preset && !isCustom
                    ? "bg-brand text-content-primary"
                    : "bg-surface-tertiary/50 text-content-secondary hover:bg-surface-tertiary"
                }`}
            >
              {preset}%
            </Button>
          ))}

          <div
            className={`flex-1 relative rounded-lg overflow-hidden border transition-colors
            ${isCustom ? "border-line-focus" : "border-line-primary"}`}
          >
            <Input
              variant="unstyled"
              inputMode="decimal"
              placeholder="Custom"
              value={isCustom ? String(slippage) : customInput}
              onChange={handleCustomChange}
              className="w-full bg-surface-tertiary/50 py-2 pl-3 pr-6 text-sm outline-none placeholder-content-tertiary text-right"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-content-secondary">
              %
            </span>
          </div>
        </div>

        {slippage > 5 && (
          <p className="text-xs text-feedback-warning mt-2">
            High slippage may result in an unfavorable trade.
          </p>
        )}
      </Dropdown>
    </div>
  );
}
