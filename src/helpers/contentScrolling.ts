import { RefObject } from "react";

export function disableContentScrolling(sheetBaseInner: RefObject<HTMLElement>) {
  const firstChild = sheetBaseInner.current?.children[0];

  firstChild?.classList.add('sheet-body-content-fixed');
}

export function enableContentScrolling(sheetBaseInner: RefObject<HTMLElement>) {
  const firstChild = sheetBaseInner.current?.children[0];

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
