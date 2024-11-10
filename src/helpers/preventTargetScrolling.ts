export function disableTargetScrolling(event: Event) {
  const eventTargetElement = event.target as HTMLElement;
  eventTargetElement.style.overflowY = 'hidden';
}

export function enableTargetScrolling(event: Event) {
  const eventTargetElement = event.target as HTMLElement;
  eventTargetElement.style.overflowY = 'scroll';
}
