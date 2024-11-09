import { getSnapPointHeights, TSnapPoint } from '../scripts/sheet-snap-points';
import { toFixedFloat } from '../utilities/toFixed';
import { toDecimalPercent } from '../utilities/toPercent';

interface CaclulateSheetScalePercent {
  snapPoints: TSnapPoint[];
  currentSheetHeight: number;
  targetPercent: number;
}
export function calculateSheetScalePercent({
  snapPoints,
  currentSheetHeight,
  targetPercent,
}: CaclulateSheetScalePercent): number {
  const snapPointHeights = getSnapPointHeights(snapPoints);
  const snapPointHeightsOrdered = snapPointHeights.sort((a, b) => a - b);

  const secondToLastHeight = snapPointHeightsOrdered[snapPointHeightsOrdered.length - 2];
  const lastHeight = snapPointHeightsOrdered[snapPointHeightsOrdered.length - 1];

  if (currentSheetHeight >= secondToLastHeight) {
    const normalizedPercent =
      toDecimalPercent(currentSheetHeight - secondToLastHeight) /
      (lastHeight - secondToLastHeight);

    return toFixedFloat(1 - normalizedPercent * targetPercent, 4); // 4 decimal places for smoother scaling
  }

  return 1;
}

export function calculateSheetScaleRadiusPercent({
  snapPoints,
  currentSheetHeight,
  targetPercent,
}: CaclulateSheetScalePercent): number {
  const snapPointHeights = getSnapPointHeights(snapPoints);
  const snapPointHeightsOrdered = snapPointHeights.sort((a, b) => a - b);

  const secondToLastHeight = snapPointHeightsOrdered[snapPointHeightsOrdered.length - 2];
  const lastHeight = snapPointHeightsOrdered[snapPointHeightsOrdered.length - 1];

  if (currentSheetHeight >= secondToLastHeight) {
    const normalizedPercent =
      toDecimalPercent(currentSheetHeight - secondToLastHeight) /
      (lastHeight - secondToLastHeight);

    return toFixedFloat(normalizedPercent * targetPercent, 4);
  }

  return 0;
}
