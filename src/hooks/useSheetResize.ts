import { useEffect, useState } from 'react';
import { useElementContext } from '../contexts/elementContext';
import {
  isContentScrollTop,
  updateScrolling
} from '../helpers/contentScrolling';
import { enableTargetAction } from '../helpers/preventTargetAction';
import {
  findClosestSnapPoint,
  getSnapPointHeights,
  isMaximumHeight,
  isMinimumHeight,
  TSnapPoint
} from '../scripts/sheet-snap-points';
import { invertValue } from '../utilities/invertValue';
import useSheetEventListeners from './useSheetEventListeners';

type ResizeSnapPointTargetHeight = { targetHeight: number };

function useSheetResize(
  currentHeight: number,
  isPresented: boolean,
  snapPoints: TSnapPoint[],
  preventCloseOnResize: boolean,
) {
  const { sheetOverlayRef, sheetElementRef, sheetBaseInnerRef } = useElementContext();
  const [resizeHeight, setResizeHeight] = useState<number>(currentHeight);
  useSheetEventListeners(
    sheetElementRef.current,
    sheetOverlayRef.current,
    startResize,
    resize,
    resetResize
  );

  const [resizeSnapPointTargetHeight, setResizeSnapPointTargetHeight] =
    useState<ResizeSnapPointTargetHeight>({ targetHeight: 0 });

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [mouseCurrentY, setMouseCurrentY] = useState<number>(0);
  const [mousePreviousY, setMousePreviousY] = useState<number>(0);

  // Sync the height with the current height
  useEffect(() => {
    setResizeHeight(currentHeight);
    updateScrolling(snapPoints, resizeHeight, sheetBaseInnerRef.current)
  }, [currentHeight]);

  // Update the height
  useEffect(() => {
    if (mouseCurrentY !== mousePreviousY && mousePreviousY !== 0 && mouseCurrentY !== 0) {
      updateHeight();
    }
  }, [mouseCurrentY, mousePreviousY]);

  useEffect(() => {
    updateActiveSnapPoint();
  }, [isMouseDown]);

  function updateHeight() {
    const mouseDeltaY = invertValue(mouseCurrentY - mousePreviousY);
    const newHeight = currentHeight + mouseDeltaY;

    const snapPointHeights = getSnapPointHeights(snapPoints);
    if (mouseDeltaY > 0 && !isMaximumHeight(currentHeight, snapPointHeights)) {
      setResizeHeight(newHeight);
      return;
    }

    if (
      mouseDeltaY < 0 &&
      isMinimumHeight(currentHeight, snapPointHeights, preventCloseOnResize)
    ) {
      setResizeHeight(newHeight);
      return;
    }
  }

  function updateActiveSnapPoint() {
    if (isMouseDown) {
      return;
    }

    const snapPointHeights = getSnapPointHeights(snapPoints);
    const closestSnapPoint = findClosestSnapPoint(snapPointHeights, resizeHeight);

    if (closestSnapPoint !== currentHeight) {
      setResizeSnapPointTargetHeight({ targetHeight: closestSnapPoint });
    }
  }

  // Start the resize
  function startResize() {
    if (!isPresented) {
      return;
    }

    setIsMouseDown(true);
  }

  // Run the resize
  function resize(event: Event) {
    if (!isMouseDown || !isContentScrollTop(event)) {
      // event.preventDefault(); // Prevent sheet from closing after resize on sheet overlay
      return;
    }

    if (mouseCurrentY !== 0) {
      setMousePreviousY(mouseCurrentY);
    }

    const currentY =
      event instanceof TouchEvent ? event.touches[0].clientY : (event as MouseEvent).clientY;
    setMouseCurrentY(currentY);
  }

  // Reset the resize height
  function resetResize(event: Event) {
    enableTargetAction(event); // Disables buttons from triggering while sheet is being resized
    setIsMouseDown(false);
    setMouseCurrentY(0);
    setMousePreviousY(0);
  }

  return {
    resizeHeight,
    resizeSnapPointTargetHeight,
    isMouseDown,
    resetResize,
  };
}

export default useSheetResize;