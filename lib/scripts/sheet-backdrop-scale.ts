export function scaleBackdrop(
  scale: number,
  borderRadius: number,
  rootElementId: string | boolean
) {
  let rootElement = document.getElementById(`${rootElementId}`) as HTMLElement;

  if (typeof rootElementId === 'boolean') {
    rootElement = document.getElementById('root') as HTMLElement;
  }

  rootElement.style.transform = `scale(${scale})`;
  rootElement.style.borderRadius = `${borderRadius}px`;
  rootElement.style.overflow = scale < 1 ? 'hidden' : 'auto';
}
