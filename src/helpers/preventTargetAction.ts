let currentTargetDisabled: HTMLElement;

export function preventTargetAction(event: Event) {
  if (!event) {
    return;
  }

  const eventTarget = event.target as HTMLElement;
  //   const eventCurrentTarget = event.currentTarget as HTMLElement;

  if (eventTarget.className === 'sheet-base-inner' || eventTarget.id === 'sheetOverlay') {
    return;
  }

  eventTarget.style.pointerEvents = 'none';
  currentTargetDisabled = eventTarget;
}

export function enableTargetAction(event: Event) {
  if (!event || !currentTargetDisabled) {
    return;
  }

  currentTargetDisabled.style.pointerEvents = 'auto';
}
