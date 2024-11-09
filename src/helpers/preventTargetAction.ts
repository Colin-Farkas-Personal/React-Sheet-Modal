let currentTargetDisabled: HTMLElement;

export function preventTargetAction(event: Event) {
  const eventTarget = event.target as HTMLElement;

  if (eventTarget.className === 'sheet-base-inner') {
    return;
  }

  eventTarget.style.pointerEvents = 'none';
  currentTargetDisabled = eventTarget;
}

export function enableTargetAction() {
  currentTargetDisabled.style.pointerEvents = 'auto';
}
