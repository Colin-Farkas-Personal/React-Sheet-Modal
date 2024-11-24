import { getSnapPointHeights, TSnapPoint } from '../scripts/sheet-snap-points';
import { toFixedFloat } from '../utilities/toFixed';
import { toDecimalPercent } from '../utilities/toPercent';

interface CaclulateSheetScalePercent {
  snapPoints: TSnapPoint[];
  currentSheetHeight: number;
  targetSnapPointIndex: number;
  targetPercent: number;
}
export function calculateSheetScalePercent({
  snapPoints,
  currentSheetHeight,
  targetSnapPointIndex,
  targetPercent,
}: CaclulateSheetScalePercent): number {
  const snapPointHeights = getSnapPointHeights(snapPoints);
  const snapPointHeightsOrdered = snapPointHeights.sort((a, b) => a - b);

  const targetSnapPointHeight = snapPointHeightsOrdered[targetSnapPointIndex];
  const lastHeight = snapPointHeightsOrdered[snapPointHeightsOrdered.length - 1];

  if (currentSheetHeight >= targetSnapPointHeight) {
    const normalizedPercent =
      toDecimalPercent(currentSheetHeight - targetSnapPointHeight) /
      (lastHeight - targetSnapPointHeight);

    return toFixedFloat(1 - normalizedPercent * targetPercent, 4); // 4 decimal places for smoother scaling
  }

  return 1;
}

export function calculateSheetScaleRadiusPercent({
  snapPoints,
  currentSheetHeight,
  targetSnapPointIndex,
  targetPercent,
}: CaclulateSheetScalePercent): number {
  const snapPointHeights = getSnapPointHeights(snapPoints);
  const snapPointHeightsOrdered = snapPointHeights.sort((a, b) => a - b);

  const targetSnapPointHeight = snapPointHeightsOrdered[targetSnapPointIndex];
  const lastHeight = snapPointHeightsOrdered[snapPointHeightsOrdered.length - 1];

  if (currentSheetHeight >= targetSnapPointHeight) {
    const normalizedPercent =
      toDecimalPercent(currentSheetHeight - targetSnapPointHeight) /
      (lastHeight - targetSnapPointHeight);

    return toFixedFloat(normalizedPercent * targetPercent, 4);
  }

  return 0;
}
