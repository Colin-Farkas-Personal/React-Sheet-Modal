export function disableTargetScrolling(event: Event) {
  const eventTargetElement = event.target as HTMLElement;
  eventTargetElement.style.overflow = 'hidden';
}

export function enableTargetScrolling(event: Event) {
  const eventTargetElement = event.target as HTMLElement;
  eventTargetElement.style.overflow = 'scroll';
}
