import { useEffect, useRef } from 'react';

function useSheetEventListeners(
  sheetElement: Element | null,
  sheetOverlayElement: Element | null,
  startResize: (event: Event) => void,
  resize: (event: Event) => void,
  resetResize: (event: Event) => void
) {
  // Ref to track if event listeners have been added
  const hasAddedEvents = useRef<boolean>(false);

  useEffect(() => {
    if (!sheetElement || !sheetOverlayElement || hasAddedEvents.current) {
      return;
    }

    // Add event listeners
    // Sheet Element
    // Mouse events
    sheetElement.addEventListener('mousedown', startResize as EventListener);
    sheetElement.addEventListener('mousemove', resize as EventListener);
    sheetElement.addEventListener('mouseup', resetResize as EventListener);

    // Touch events
    sheetElement.addEventListener('touchstart', startResize as EventListener);
    sheetElement.addEventListener('touchmove', resize as EventListener);
    sheetElement.addEventListener('touchend', resetResize as EventListener);

    // Sheet Overlay Element
    sheetOverlayElement.addEventListener('mousemove', resize as EventListener);
    sheetOverlayElement.addEventListener('mouseup', resetResize as EventListener);

    // Mark listeners as added
    hasAddedEvents.current = true;

    // Remove event listeners
    return () => {
      // Sheet Element
      sheetElement.removeEventListener('mousedown', startResize as EventListener);
      sheetElement.removeEventListener('mousemove', resize as EventListener);
      sheetElement.removeEventListener('mouseup', resetResize as EventListener);

      // Touch events
      sheetElement.removeEventListener('touchstart', startResize as EventListener);
      sheetElement.removeEventListener('touchmove', resize as EventListener);
      sheetElement.removeEventListener('touchend', resetResize as EventListener);

      // Sheet Overlay Element
      sheetOverlayElement.removeEventListener('mousemove', resize as EventListener);
      sheetOverlayElement.removeEventListener('mouseup', resetResize as EventListener);

      // Mark listeners as removed
      hasAddedEvents.current = false;
    };
  }, [sheetElement, startResize, resize, resetResize]);
}

export default useSheetEventListeners;
