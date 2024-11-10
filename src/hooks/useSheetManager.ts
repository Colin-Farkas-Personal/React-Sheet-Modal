import { useEffect, useState } from 'react';
import { getMainSnapPoint, TSnapPoint } from '../scripts/sheet-snap-points';
import useSheetResize from './useSheetResize';
import useSheetTransition from './useSheetTransition';
import { useSheetStyle } from './useSheetStyle';
import { toFixedFloat } from '../utilities/toFixed';

function useSheetManager(
  sheetElement: Element | null,
  sheetOverlayElement: Element | null,
  rootElementId: string | boolean,
  snapPoints: TSnapPoint[],
  isPresented: boolean,
  preventCloseOnResize: boolean,
  callbackOnClose: () => void
) {
  const sheetMainSnapPoint = getMainSnapPoint(snapPoints, sheetElement);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    transitionHeight,
    isSheetClosed,
    isTransitionAnimating,
    runSheetTransition,
    stopSheetTransition,
  } = useSheetTransition(sheetMainSnapPoint, isPresented, callbackOnClose);

  const { resizeHeight, resizeSnapPointTargetHeight, isMouseDown } = useSheetResize(
    sheetHeight,
    isPresented,
    snapPoints,
    preventCloseOnResize,
    sheetElement,
    sheetOverlayElement
  );

  const { sheetOverlayOpacity } = useSheetStyle(sheetHeight, snapPoints, rootElementId);

  function closeSheet() {
    if (isAnimating || preventCloseOnResize) {
      return;
    }

    callbackOnClose();
  }

  // SHEET HEIGHT
  useEffect(() => {
    setSheetHeight(transitionHeight);
  }, [transitionHeight]);

  useEffect(() => {
    setSheetHeight(resizeHeight);
  }, [resizeHeight]);

  // SHEET TRANSITION
  useEffect(() => {
    if (isPresented) {
      runSheetTransition(resizeHeight, resizeSnapPointTargetHeight.targetHeight);
    }
  }, [resizeSnapPointTargetHeight]);

  useEffect(() => {
    if (isMouseDown) {
      stopSheetTransition(); // Prevents an infinite loop - ongoing transition from interfering with the resize
    }
  }, [isMouseDown]);

  // ONGOING ANIMATION - prevents the sheet from being closed prematurely
  useEffect(() => {
    setIsAnimating(isTransitionAnimating);
  }, [isTransitionAnimating]);

  return {
    sheetHeight: toFixedFloat(sheetHeight, 4),
    sheetOverlayOpacity,
    isSheetClosed,
    closeSheet,
  };
}

export default useSheetManager;
