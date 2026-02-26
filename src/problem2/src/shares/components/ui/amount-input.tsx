import type { ChangeEventHandler } from "react";
import { Input } from "./input";

interface AmountInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

export function AmountInput({
  value,
  onChange,
  placeholder = "0.00",
}: AmountInputProps) {
  return (
    <Input
      variant="transparent"
      inputMode="decimal"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
