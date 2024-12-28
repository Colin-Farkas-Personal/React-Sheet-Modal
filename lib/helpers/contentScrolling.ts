import {
  findLargestSnapPoint,
  getSnapPointHeights,
  TSnapPoint,
} from '../scripts/sheet-snap-points';

export let scrollableElement: Element | null = null;

export function setScrollableElement(sheetBaseInnerElement: HTMLElement): void {
  const children = sheetBaseInnerElement.children;
  const scrollableChild = findScrollableChild(children);

  if (scrollableChild) {
    scrollableElement = scrollableChild;
  }
}

function findScrollableChild(childElements: HTMLCollection): Element | null {
  let scrollableElement: Element | null = null;
  
  for (let i = 0; i < childElements.length; i++) {
    const currentChild = childElements[i] as HTMLElement;
    const currentStyleOverflowY = window.getComputedStyle(currentChild).overflowY;
    
    
    if (currentStyleOverflowY && currentStyleOverflowY === 'scroll') {
      scrollableElement = currentChild;
    }
  }

  return scrollableElement;
}

export function disableContentScrolling() {
  if (scrollableElement) {
    scrollableElement.classList.add('sheet-body-content-fixed');
  }
}

export function enableContentScrolling() {
  if (scrollableElement) {
    scrollableElement.classList.remove('sheet-body-content-fixed');
  }
}

export function isContentScrollTop() {
  if (scrollableElement) {
    const eventTargetScrollTop = scrollableElement.scrollTop;

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
) {
  if (!scrollableElement) {
    return;
  }

  // 1. ResizeHeight < MAX -> NO CHILD SCROLL
  // 2. ResizeHeight >= MAX -> ALLOW CHILD SCROLL
  // 3. (ResizeHeight >= MAX) && (ScrollTop > 0) -> NO PARENT SCROLL
  // preventTargetAction(event);
  const snapPointHeights = getSnapPointHeights(snapPoints);
  const largestSnapPoint = findLargestSnapPoint(snapPointHeights);

  if (resizeHeight >= largestSnapPoint - MAX_HEIGHT_MARGIN) {
    enableContentScrolling();
  } else if (resizeHeight < largestSnapPoint) {
    disableContentScrolling();
  }
}
