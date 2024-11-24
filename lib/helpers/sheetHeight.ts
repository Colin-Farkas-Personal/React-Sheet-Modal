import { toDecimalPercent, toWholePercent } from '../utilities/toPercent';

// Calculates the height in pixels based on full window height
export function heightPercentToPixels(percent: number | string, height?: number): number {
  const percentValue = parseInt(percent.toString());

  if (height) {
    return (percentValue / 100) * height;
  }

  return (percentValue / 100) * window.innerHeight;
}

// Calculates the height in percent based on full window height
type PercentType = 'whole' | 'decimal';
export function heightPixelsToPercent(
  pixels: number,
  height: number = window.innerHeight,
  type: PercentType = 'whole'
): number {
  const percentValue = pixels / height;

  switch (type) {
    case 'whole':
      return toWholePercent(percentValue);

    case 'decimal':
      return toDecimalPercent(percentValue);
  }
}
