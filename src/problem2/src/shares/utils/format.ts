export function formatAmount(value: number, maxDecimals = 6): string {
  if (!Number.isFinite(value)) return "";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

export function isValidDecimalInput(value: string): boolean {
  return value === "" || /^\d*\.?\d*$/.test(value);
}

export function formatUsd(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "$0.00";
  if (value < 0.01) return "< $0.01";
  return (
    "$" +
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
