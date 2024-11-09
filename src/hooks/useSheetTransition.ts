import { useEffect, useState } from 'react';
import {
  animateHeight,
  cancelAnimateHeight,
  SHEET_TRANSITION_CLOSE_DURATION,
  SHEET_TRANSITION_SNAP_POINT_DURATION,
  SHEET_TRANSITION_OPEN_DURATION,
} from '../scripts/sheet-animation';
import { easingEaseOutExpo } from '../utilities/easingFunctions';

function useSheetTransition(
  initialHeight: number,
  isPresented: boolean,
  callbackOnClose: () => void
) {
  const [transitionHeight, setTransitionHeight] = useState<number>(0);
  const [isSheetClosed, setIsSheetClosed] = useState<boolean>(true);
  const [isTransitionAnimating, setIsTransitionAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (isPresented) {
      sheetTransitionOpen();
    }

    if (!isPresented && transitionHeight > 0) {
      sheetTransitionClose();
    }
  }, [isPresented]);

  async function sheetTransitionSnapPoint(
    currentHeight: number = 0,
    targetHeight: number = initialHeight
  ) {
    setIsTransitionAnimating(true);
    await animateHeight(
      currentHeight,
      targetHeight,
      SHEET_TRANSITION_SNAP_POINT_DURATION,
      setTransitionHeight,
      easingEaseOutExpo
    );
    setIsTransitionAnimating(false);
  }

  async function sheetTransitionOpen(
    currentHeight: number = 0,
    targetHeight: number = initialHeight
  ) {
    setIsSheetClosed(false);
    setIsTransitionAnimating(true);
    await animateHeight(
      currentHeight,
      targetHeight,
      SHEET_TRANSITION_OPEN_DURATION,
      setTransitionHeight,
      easingEaseOutExpo
    );

    setIsTransitionAnimating(false);
  }

  async function sheetTransitionClose(
    currentHeight: number = transitionHeight,
    targetHeight: number = 0
  ) {
    setIsTransitionAnimating(true);
    await animateHeight(
      currentHeight,
      targetHeight,
      SHEET_TRANSITION_CLOSE_DURATION,
      setTransitionHeight,
      easingEaseOutExpo
    );

    setIsTransitionAnimating(false);

    if (targetHeight === 0) {
      setIsSheetClosed(true);
      callbackOnClose();
    }
  }

  function runSheetTransition(startHeight: number, targetHeight: number) {
    if (targetHeight === 0 && startHeight !== 0) {
      sheetTransitionClose();
    }

    sheetTransitionSnapPoint(startHeight, targetHeight);
  }

  function stopSheetTransition() {
    setIsTransitionAnimating(false);
    cancelAnimateHeight();
  }

  return {
    transitionHeight,
    isSheetClosed,
    isTransitionAnimating,
    runSheetTransition,
    stopSheetTransition,
  };
}

export default useSheetTransition;
