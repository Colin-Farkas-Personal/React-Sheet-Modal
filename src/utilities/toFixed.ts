export function toFixedFloat(value: number, numberOfDecimals: number) {
  return parseFloat(value.toFixed(numberOfDecimals));
}
