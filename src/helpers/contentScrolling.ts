import { findLargestSnapPoint, getSnapPointHeights, TSnapPoint } from "../scripts/sheet-snap-points";

export function disableContentScrolling(sheetBaseInnerElement: HTMLElement) {
  const firstChild = sheetBaseInnerElement.children[0];

  firstChild?.classList.add('sheet-body-content-fixed');
}

export function enableContentScrolling(sheetBaseInnerElement: HTMLElement) {
  const firstChild = sheetBaseInnerElement.children[0];

  firstChild?.classList.remove('sheet-body-content-fixed');
}

export function isContentScrollTop(event: Event) {
  const eventTargetElement = event.target as Element;
  const eventTargetScrollTop = eventTargetElement.scrollTop;

  if (eventTargetScrollTop > 0) {
    return false;
  }

  return true;
}

const MAX_HEIGHT_MARGIN = 1;
export function updateScrolling(
  snapPoints: TSnapPoint[],
  resizeHeight: number,
  sheetBaseInnerElement: HTMLElement | null
) {
  if (!sheetBaseInnerElement) {
    return;
  }

  // 1. ResizeHeight < MAX -> NO CHILD SCROLL
  // 2. ResizeHeight >= MAX -> ALLOW CHILD SCROLL
  // 3. (ResizeHeight >= MAX) && (ScrollTop > 0) -> NO PARENT SCROLL
  // preventTargetAction(event);
  const snapPointHeights = getSnapPointHeights(snapPoints);
  const largestSnapPoint = findLargestSnapPoint(snapPointHeights);

  if (resizeHeight >= largestSnapPoint - MAX_HEIGHT_MARGIN) {
    enableContentScrolling(sheetBaseInnerElement);
  } else if (resizeHeight < largestSnapPoint) {
    disableContentScrolling(sheetBaseInnerElement);
  }
}