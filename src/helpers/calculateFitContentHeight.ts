export function calculateFitContentHeight(element: HTMLElement): number {
  element.style.height = 'fit-content';

  // Measure the content height
  const contentHeight = element.scrollHeight;

  // Restore the original height
  element.style.height = contentHeight + 'px';

  return contentHeight;
}
