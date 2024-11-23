import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { useElementContext } from '../../contexts/elementContext';
import {
  getOverlayClassNames,
  getOverlayStyle,
  getSheetClassNames,
  getSheetStyle,
} from '../../helpers/sheetAttributes';
import useSheetManager from '../../hooks/useSheetManager';
import { SnapPoint, TSnapPoint } from '../../scripts/sheet-snap-points';
import '../../style/sheet.css';

interface SheetProps {
  isPresented: boolean;
  onClose: () => void;
  snapPoints?: TSnapPoint[];
  scaleBackdrop?: string | boolean;
  backgroundInteractionEnabled?: boolean;
  showGrabber?: boolean;
  preventCloseOnResize?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

/**
 * JSX Component for displaying a sheet modal
 * @param {boolean} isPresented - Whether the sheet is displayed
 * @param {() => void} onClose - Callback for closing the sheet
 * @param {TSnapPoint[]} presentationDetents - Set of snapping points for the sheet
 * @param {string | boolean} scaleBackdrop - When included, adds the effect of scaling the backdrop when the sheet is open
 * @param {boolean} backgroundInteractionEnabled - If true, allows interaction with the background when the sheet is open
 * @param {boolean} showGrabber - Shows a grabber at the top of the sheet
 * @param {boolean} preventCloseOnResize - If true, prevents the sheet from closing when the sheet is resized
 * @param {string} className - Add a custom styling class to the sheet
 * @param {string} style - Overwrite the style attribute of the sheet
 * @param {React.ReactNode} children - The content to display in the sheet
 * @returns
 */
function Sheet({
  isPresented,
  onClose,
  snapPoints = [SnapPoint.large],
  scaleBackdrop = false,
  backgroundInteractionEnabled = false,
  showGrabber = false,
  preventCloseOnResize = false,
  className = '',
  style,
  children,
}: SheetProps) {
  const { sheetOverlayRef, sheetElementRef, sheetBaseInnerRef } = useElementContext();
  const { sheetHeight, sheetOverlayOpacity, isSheetClosed, closeSheet } = useSheetManager(
    scaleBackdrop,
    snapPoints,
    isPresented,
    preventCloseOnResize,
    onClose
  );

  if (isSheetClosed) {
    return false;
  }

  // STYLES AND CLASSES
  const overlayClassNames = getOverlayClassNames({
    backgroundInteractionEnabled: backgroundInteractionEnabled,
    preventCloseOnResize: preventCloseOnResize,
  });
  const overlayStyle = getOverlayStyle({
    backgroundInteractionEnabled: backgroundInteractionEnabled,
    sheetOverlayOpacity: sheetOverlayOpacity,
  });

  const sheetClassNames = getSheetClassNames({ className: className });
  const sheetStyle = getSheetStyle({
    sheetHeight: sheetHeight,
    style: style,
  });

  return ReactDOM.createPortal(
    <>
      <span
        id="sheetOverlay"
        ref={sheetOverlayRef}
        className={overlayClassNames}
        onClick={closeSheet}
        style={overlayStyle}
      />

      <div id="sheetBase" ref={sheetElementRef} className={sheetClassNames} style={sheetStyle}>
        {showGrabber && <span className="sheet-top-edge" />}
        <div ref={sheetBaseInnerRef} id="sheetBaseInner" className="sheet-base-inner">
          {children}
        </div>
      </div>
    </>,
    document.body // Render sheet outside root
  );
}

export default Sheet;
