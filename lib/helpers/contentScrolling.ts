import {
  findLargestSnapPoint,
  getSnapPointHeights,
  TSnapPoint,
} from '../scripts/sheet-snap-points';

function findScrollableChild(childElements: HTMLCollection): Element | null {
  let scrollableElement: Element | null = null;

  for (let i = 0; i < childElements.length; i++) {
    const currentChild = childElements[i] as HTMLElement;
    const currentStyle = window.getComputedStyle(currentChild);

    if (currentStyle.overflowY) {
      scrollableElement = currentChild;
    }
  }

  return scrollableElement;
}

export function disableContentScrolling(sheetBaseInnerElement: HTMLElement) {
  const children = sheetBaseInnerElement.children;
  const scrollableChild = findScrollableChild(children);

  if (scrollableChild) {
    scrollableChild.classList.add('sheet-body-content-fixed');
  }
}

export function enableContentScrolling(sheetBaseInnerElement: HTMLElement) {
  const children = sheetBaseInnerElement.children;
  const scrollableChild = findScrollableChild(children);

  if (scrollableChild) {
    scrollableChild.classList.remove('sheet-body-content-fixed');
  }
}

export function isContentScrollTop(sheetBaseInnerElement: HTMLElement | null) {
  if (!sheetBaseInnerElement) {
    return true;
  }
  
  const children = sheetBaseInnerElement.children;
  const scrollableChild = findScrollableChild(children);

  if (scrollableChild) {
    const eventTargetScrollTop = scrollableChild.scrollTop;

    if (eventTargetScrollTop > 0) {
      return false;
    }
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
