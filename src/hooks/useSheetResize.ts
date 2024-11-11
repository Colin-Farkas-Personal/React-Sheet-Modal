import { useEffect, useState } from 'react';
import { enableTargetAction } from '../helpers/preventTargetAction';
import {
  findClosestSnapPoint,
  findLargestSnapPoint,
  getSnapPointHeights,
  isMaximumHeight,
  isMinimumHeight,
  TSnapPoint,
} from '../scripts/sheet-snap-points';
import { invertValue } from '../utilities/invertValue';
import useSheetEventListeners from './useSheetEventListeners';
import {
  disableContentScrolling,
  enableContentScrolling,
  isContentScrollTop,
} from '../helpers/contentScrolling';

type ResizeSnapPointTargetHeight = { targetHeight: number };

function useSheetResize(
  currentHeight: number,
  isPresented: boolean,
  snapPoints: TSnapPoint[],
  preventCloseOnResize: boolean,
  sheetElement: Element | null,
  sheetOverlayElement: Element | null
) {
  const [resizeHeight, setResizeHeight] = useState<number>(currentHeight);
  useSheetEventListeners(sheetElement, sheetOverlayElement, startResize, resize, resetResize);

  const [resizeSnapPointTargetHeight, setResizeSnapPointTargetHeight] =
    useState<ResizeSnapPointTargetHeight>({ targetHeight: 0 });

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [mouseCurrentY, setMouseCurrentY] = useState<number>(0);
  const [mousePreviousY, setMousePreviousY] = useState<number>(0);

  // Sync the height with the current height
  useEffect(() => {
    setResizeHeight(currentHeight);
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
  function startResize(event: Event) {
    if (!isPresented) {
      return;
    }

    setIsMouseDown(true);
  }

  // Run the resize
  function resize(event: Event) {
    // 1. ResizeHeight < MAX -> NO CHILD SCROLL
    // 2. ResizeHeight >= MAX -> ALLOW CHILD SCROLL
    // 3. (ResizeHeight >= MAX) && (ScrollTop > 0) -> NO PARENT SCROLL
    // preventTargetAction(event);
    const snapPointHeights = getSnapPointHeights(snapPoints);
    const largestSnapPoint = findLargestSnapPoint(snapPointHeights);
    let canResize = true;
    if (resizeHeight < largestSnapPoint - 50) {
      console.log('disable scroll');
      disableContentScrolling(event);
    } else if (resizeHeight >= largestSnapPoint - 50) {
      console.log('enable scroll');
      enableContentScrolling(event);
      canResize = isContentScrollTop(event);
    }

    if (!isMouseDown || !canResize) {
      console.log('content is top!');
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
    enableTargetAction(event);
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
