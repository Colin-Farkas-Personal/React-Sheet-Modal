import { CSSProperties } from 'react';

interface OverlayClassNames {
  preventCloseOnResize: boolean;
  backgroundInteractionEnabled: boolean;
}
export function getOverlayClassNames({
  preventCloseOnResize,
  backgroundInteractionEnabled,
}: OverlayClassNames): string {
  const classNames: string[] = ['sheet-overlay'];

  if (preventCloseOnResize) {
    classNames.push('sheet-overlay-prevent-close-on-resize');
  }

  if (backgroundInteractionEnabled) {
    classNames.push('sheet-overlay-background-interaction-enabled');
  }

  return classNames.join(' ');
}

interface OverlayStyle {
  backgroundInteractionEnabled: boolean;
  sheetOverlayOpacity: number;
}
export function getOverlayStyle({
  backgroundInteractionEnabled,
  sheetOverlayOpacity,
}: OverlayStyle): CSSProperties {
  const overlayOpacity = backgroundInteractionEnabled ? 0 : sheetOverlayOpacity;

  return { opacity: overlayOpacity };
}

interface SheetClassNames {
  className: string;
}
export function getSheetClassNames({ className }: SheetClassNames): string {
  const classNames: string[] = ['sheet-base'];

  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
}

interface SheetStyle {
  sheetHeight: number;
  style: CSSProperties | undefined;
}
export function getSheetStyle({
  sheetHeight,
  style,
}: SheetStyle): CSSProperties {

  return {
    height: sheetHeight,
    ...style,
  };
}
