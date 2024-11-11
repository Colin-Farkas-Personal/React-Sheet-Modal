export function disableContentScrolling(event: Event) {
  const eventTargetElement = event.target as HTMLElement;

  const isScrollableY = getComputedStyle(eventTargetElement).overflowY === 'scroll';
  const isScrollable = getComputedStyle(eventTargetElement).overflow === 'scroll';

  if (isScrollable || isScrollableY) {
    eventTargetElement.style.overflowY = 'hidden';
  }

  return;
}

export function enableContentScrolling(event: Event) {
  const eventTargetElement = event.target as HTMLElement;

  const isScrollableY = getComputedStyle(eventTargetElement).overflowY === 'hidden';
  const isScrollable = getComputedStyle(eventTargetElement).overflow === 'hidden';

  if (isScrollable || isScrollableY) {
    eventTargetElement.style.overflowY = 'scroll';
  }

  return;
}

export function isContentScrollTop(event: Event) {
  const eventTargetElement = event.target as Element;
  const eventTargetScrollTop = eventTargetElement.scrollTop;

  if (eventTargetScrollTop > 0) {
    return false;
  }

  return true;
}
