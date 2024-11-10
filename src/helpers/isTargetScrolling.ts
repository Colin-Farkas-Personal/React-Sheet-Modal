let isScrolling: Boolean = false;

export function isTargetScrolling(event: Event) {
  const eventTargetElement = event.target as Element;
  const eventTargetScrollTop = eventTargetElement.scrollTop;

  if (eventTargetScrollTop > 0 || isScrolling) {
    isScrolling = true;
    return true;
  }

  return false;
}

export function enableIsTargetScrolling() {
  isScrolling = false;
}
