export function easingLinear(x: number): number {
  return x;
}

export function easingEaseOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
