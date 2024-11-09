import {
  findSmallestSnapPoint,
  getSnapPointHeights,
  TSnapPoint,
} from '../scripts/sheet-snap-points';
import { heightPixelsToPercent } from './sheetHeight';

export function calculateSheetStylePercent(
  snapPoints: TSnapPoint[],
  currentSheetHeight: number,
  targetPercent: number,
  isReversed: boolean = false
): number {
  const snapPointHeights = getSnapPointHeights(snapPoints);
  const snapPointHeightsOrdered = snapPointHeights.sort((a, b) => a - b);

  const fullOpacityHeight = findSmallestSnapPoint(snapPointHeights);

  const sheetHeightPercent = heightPixelsToPercent(
    currentSheetHeight,
    fullOpacityHeight,
    'decimal'
  );

  if (sheetHeightPercent > 1) {
    return isReversed ? 1 - targetPercent : targetPercent;
  }

  return isReversed
    ? 1 - sheetHeightPercent * targetPercent
    : sheetHeightPercent * targetPercent;
}
