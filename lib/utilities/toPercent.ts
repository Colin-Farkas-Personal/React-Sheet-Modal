export function toWholePercent(value: number): number {
  return Math.round(value * 100);
}
export function toDecimalPercent(value: number): number {
  return parseFloat(value.toFixed(2));
}
