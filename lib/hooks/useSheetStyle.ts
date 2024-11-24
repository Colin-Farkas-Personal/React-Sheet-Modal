import { useEffect, useState } from 'react';
import {
  calculateSheetScalePercent,
  calculateSheetScaleRadiusPercent,
} from '../helpers/calculateSheetScale';
import { calculateSheetStylePercent } from '../helpers/calculateSheetStyle';
import { scaleBackdrop } from '../scripts/sheet-backdrop-scale';
import {
  findLargestSnapPoint,
  getSnapPointHeightsOrdered,
  SnapPoint,
  TSnapPoint,
} from '../scripts/sheet-snap-points';

const SHEET_BACKDROP_SCALE_MAX = 0.06;
const SHEET_OVERLAY_OPACITY_MAX = 0.4;
const SHEET_BORDER_RADIUS_MAX_PIXELS = 12;

export function useSheetStyle(
  isPresented: boolean,
  isTransitionAnimating: boolean,
  currentHeight: number,
  snapPoints: TSnapPoint[],
  rootElementId: string | boolean
) {
  const [sheetOverlayOpacity, setSheetOverlayOpacity] = useState(0);
  const [targetSnapPointIndex, setTargetSnapPointIndex] = useState(0);

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
    if (!isTransitionAnimating) {
      const snapPointHeightsOrdered = getSnapPointHeightsOrdered(snapPoints);
      const largestSnapPoint = findLargestSnapPoint(snapPointHeightsOrdered);
      const isFullHeightTransition = !isPresented && currentHeight >= largestSnapPoint;
      const newTargetSnapPointIndex = isFullHeightTransition
        ? 0
        : snapPointHeightsOrdered.length - 2;

      setTargetSnapPointIndex(newTargetSnapPointIndex);
    }
  }, [isPresented, currentHeight, isTransitionAnimating]);

  useEffect(() => {
    if (rootElementId && snapPoints.includes(SnapPoint.large)) {
      const newScale = calculateSheetScalePercent({
        snapPoints: snapPoints,
        currentSheetHeight: currentHeight,
        targetSnapPointIndex: targetSnapPointIndex,
        targetPercent: SHEET_BACKDROP_SCALE_MAX,
      });

      const newBorderRadius = calculateSheetScaleRadiusPercent({
        snapPoints: snapPoints,
        currentSheetHeight: currentHeight,
        targetSnapPointIndex: targetSnapPointIndex,
        targetPercent: SHEET_BORDER_RADIUS_MAX_PIXELS,
      });

      scaleBackdrop(newScale, newBorderRadius, rootElementId);
    }
  }, [currentHeight]);

  return { sheetOverlayOpacity };
}
