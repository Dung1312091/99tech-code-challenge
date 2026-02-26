import { ChangeEventHandler } from "react";
import { Input } from "./input";

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  autoFocus = false,
}: SearchInputProps) {
  return (
    <Input
      variant="default"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  );
}
