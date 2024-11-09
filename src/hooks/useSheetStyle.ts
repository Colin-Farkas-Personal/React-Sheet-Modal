import { useEffect, useState } from 'react';
import { calculateSheetStylePercent } from '../helpers/calculateSheetStyle';
import { scaleBackdrop } from '../scripts/sheet-backdrop-scale';
import { SnapPoint, TSnapPoint } from '../scripts/sheet-snap-points';
import {
  calculateSheetScalePercent,
  calculateSheetScaleRadiusPercent,
} from '../helpers/calculateSheetScale';

const SHEET_BACKDROP_SCALE_MAX = 0.06;
const SHEET_OVERLAY_OPACITY_MAX = 0.4;
const SHEET_BORDER_RADIUS_MAX_PIXELS = 12;

export function useSheetStyle(
  currentHeight: number,
  snapPoints: TSnapPoint[],
  rootElementId: string | boolean
) {
  const [sheetOverlayOpacity, setSheetOverlayOpacity] = useState(0);

  // Opacity
  useEffect(() => {
    const newOpacity = calculateSheetStylePercent(
      snapPoints,
      currentHeight,
      SHEET_OVERLAY_OPACITY_MAX,
      false
    );

    setSheetOverlayOpacity(newOpacity);
  }, [currentHeight]);

  // Backdrop scale
  useEffect(() => {
    if (rootElementId && snapPoints.includes(SnapPoint.large)) {
      const newScale = calculateSheetScalePercent({
        snapPoints: snapPoints,
        currentSheetHeight: currentHeight,
        targetPercent: SHEET_BACKDROP_SCALE_MAX,
      });

      const newBorderRadius = calculateSheetScaleRadiusPercent({
        snapPoints: snapPoints,
        currentSheetHeight: currentHeight,
        targetPercent: SHEET_BORDER_RADIUS_MAX_PIXELS,
      });

      scaleBackdrop(newScale, newBorderRadius, rootElementId);
    }
  }, [currentHeight]);

  return { sheetOverlayOpacity };
}
